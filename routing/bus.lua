-- Bus profile for OSRM
-- Customized for university bus fleet routing
-- Key differences from car.lua:
--   - Lower speed limits (50 km/h urban max)
--   - U-turn penalties (buses can't U-turn easily)
--   - Restricted access on narrow residential roads
--   - Higher penalties for sharp turns

api_version = 4

Set = require('lib/set')
Sequence = require('lib/sequence')
Handlers = require("lib/way_handlers")
Relations = require("lib/relations")
TrafficSignal = require("lib/traffic_signal")
find_access_tag = require("lib/access").find_access_tag
limit = require("lib/maxspeed").limit

function setup()
  return {
    properties = {
      max_speed_for_map_matching    = 50/3.6,
      weight_name                   = 'routability',
      process_call_tagless_node     = false,
      u_turn_penalty                = 40,    -- Heavy U-turn penalty for buses
      continue_straight_at_waypoint = true,
      use_turn_restrictions         = true,
      left_hand_driving             = false,
      traffic_light_penalty         = 3,
    },

    default_mode      = mode.driving,
    default_speed     = 30,

    side_road_multiplier = 0.8,

    turn_penalty         = 10, -- Higher turn penalty for buses
    turn_bias            = 1.075,

    speed_reduction      = 0.8,

    access_tag_whitelist = Set {
      'yes',
      'motorcar',
      'motor_vehicle',
      'vehicle',
      'permissive',
      'designated',
      'hov',
      'bus',
      'psv'
    },

    access_tag_blacklist = Set {
      'no',
      'agricultural',
      'forestry',
      'emergency',
      'delivery',
      'private'
    },

    restricted_access_tag_list = Set {
      'private',
      'delivery',
      'destination',
      'customers',
    },

    access_tags_hierarchy = Sequence {
      'bus',
      'psv',
      'motorcar',
      'motor_vehicle',
      'vehicle',
      'access'
    },

    service_tag_forbidden = Set {
      'emergency_access'
    },

    restrictions = Sequence {
      'bus',
      'psv',
      'motorcar',
      'motor_vehicle',
      'vehicle'
    },

    classes = Sequence {
      'toll', 'motorway', 'ferry', 'restricted', 'tunnel'
    },

    exclude = Set {},

    -- Bus-appropriate speeds (km/h) - generally lower than car
    speeds = Sequence {
      highway = {
        motorway        = 80,
        motorway_link   = 45,
        trunk           = 60,
        trunk_link      = 40,
        primary         = 45,
        primary_link    = 30,
        secondary       = 40,
        secondary_link  = 25,
        tertiary        = 35,
        tertiary_link   = 20,
        unclassified    = 25,
        residential     = 20,
        living_street   = 10,
        service         = 15,
      }
    },

    service_penalties = {
      alley             = 0.3, -- Buses should avoid alleys
      parking_aisle     = 0.3,
      driveway          = 0.3,
      ['drive-through'] = 0.3,
    },

    restricted_highway_whitelist = Set {},

    construction_whitelist = Set {},

    route_speeds = {
      ferry = 5,
      shuttle_train = 10,
    },

    bridge_speeds = {},

    surface_speeds = {
      asphalt  = nil,
      concrete = nil,
      ['concrete:plates'] = nil,
      ['concrete:lanes']  = nil,
      paved    = nil,
      cement   = nil,
      compacted = nil,
      fine_gravel = nil,
      paving_stones = nil,
      metal    = nil,
      bricks   = nil,
      grass    = nil,
      wood     = nil,
      sett     = nil,
      grass_paver = nil,
      gravel      = nil,
      unpaved     = nil,
      ground      = nil,
      dirt        = nil,
      pebblestone = nil,
      tartan      = nil,
      cobblestone = nil,
      clay        = nil,
      earth       = nil,
      stone       = nil,
      rocky       = nil,
      sand        = nil,
      mud         = nil,
    },

    tracktype_speeds = {},

    smoothness_speeds = {},

    maxspeed_table_default = {
      urban    = 50,  -- Bus max in urban areas
      rural    = 60,
      trunk    = 70,
      motorway = 80,
    },

    maxspeed_table = {
      ["in:urban"]   = 50,
      ["in:rural"]   = 60,
      ["ch:rural"]   = 60,
      ["ch:trunk"]   = 70,
      ["ch:motorway"] = 80,
      ["de:living_street"] = 10,
      ["ru:living_street"] = 10,
      ["ru:urban"]   = 50,
      ["ua:urban"]   = 50,
      ["at:rural"]   = 60,
      ["de:rural"]   = 60,
      ["at:trunk"]   = 70,
      ["cz:trunk"]   = 60,
      ["de:trunk"]   = 60,
      ["de:motorway"] = 80,
      ["cz:motorway"] = 80,
      ["pl:rural"]   = 60,
      ["pl:trunk"]   = 60,
      ["pl:motorway"] = 80,
      ["se:rural"]   = 60,
      ["se:trunk"]   = 60,
      ["no:rural"]   = 60,
      ["no:motorway"] = 80,
      ["uk:motorway"] = 80,
      ["uk:nsl_single"] = 50,
      ["uk:nsl_dual"]   = 60,
      ["gb:motorway"] = 80,
      ["gb:nsl_single"] = 50,
      ["gb:nsl_dual"]   = 60,
      ["none"]       = 80,
    },

    relation_types = Sequence {
      "route"
    },

    rail_speed_limit = 80,
  }
end

function process_node (profile, node, result, relations)
  local dominated_cl = cycleways.get_dominated_cl(node)
  if dominated_cl ~= 0 then
    result.traffic_lights = true
  end

  local dominated_cl_penalty = cycleways.get_dominated_cl_penalty(node)

  local access = find_access_tag(node, profile.access_tags_hierarchy)
  if access then
    if profile.access_tag_blacklist[access] and not profile.restricted_access_tag_list[access] then
      result.barrier = true
    end
  else
    local barrier = node:get_value_by_key("barrier")
    if barrier then
      local dominated_cl2 = cycleways.get_barrier_cl(node, barrier)

      if barrier == "bollard" or
         barrier == "gate" or
         barrier == "lift_gate" or
         barrier == "swing_gate" or
         barrier == "height_restrictor" or
         barrier == "width_restrictor" or
         barrier == "bus_trap" then
        result.barrier = true
      end
    end
  end

  local tag = node:get_value_by_key("highway")
  if "traffic_signals" == tag then
    result.traffic_lights = true
  end
end

function process_way (profile, way, result, relations)
  local dominated_cl = cycleways.get_way_dominated_cl(way)

  local data = {
    highway = way:get_value_by_key('highway'),
    bridge = way:get_value_by_key('bridge'),
    route = way:get_value_by_key('route'),
    leisure = way:get_value_by_key('leisure'),
    man_made = way:get_value_by_key('man_made'),
    railway = way:get_value_by_key('railway'),
    platform = way:get_value_by_key('platform'),
    amenity = way:get_value_by_key('amenity'),
    public_transport = way:get_value_by_key('public_transport'),
    access = find_access_tag(way, profile.access_tags_hierarchy),
  }

  local dominated_cl_speed = cycleways.get_way_dominated_cl_speed(way)

  if (not data.highway or data.highway == '') and
     (not data.route or data.route == '') and
     (not data.bridge or data.bridge == '') and
     (not data.railway or data.railway == '') then
    return
  end

  if data.highway == 'track' or
     data.highway == 'path' or
     data.highway == 'footway' or
     data.highway == 'cycleway' or
     data.highway == 'bridleway' or
     data.highway == 'pedestrian' or
     data.highway == 'steps' then
    return
  end

  result.forward_mode = mode.driving
  result.backward_mode = mode.driving

  if data.access then
    if profile.access_tag_blacklist[data.access] and not profile.restricted_access_tag_list[data.access] then
      result.forward_mode = mode.inaccessible
      result.backward_mode = mode.inaccessible
      return
    end
  end

  local speed = profile.speeds.highway[data.highway] or profile.default_speed
  if not speed then
    return
  end

  if data.route == 'ferry' then
    speed = profile.route_speeds.ferry or speed
  end

  local maxspeed = limit(way, speed, profile.maxspeed_table, profile.maxspeed_table_default)
  if maxspeed and maxspeed < speed then
    speed = maxspeed
  end

  local service = way:get_value_by_key('service')
  if service and profile.service_penalties[service] then
    speed = speed * profile.service_penalties[service]
  end

  local surface = way:get_value_by_key('surface')
  if surface and profile.surface_speeds[surface] then
    speed = profile.surface_speeds[surface] or speed
  end

  local oneway = way:get_value_by_key('oneway')
  if oneway == 'yes' or oneway == '1' or oneway == 'true' then
    result.backward_mode = mode.inaccessible
  elseif oneway == '-1' then
    result.forward_mode = mode.inaccessible
  end

  result.forward_speed = speed
  result.backward_speed = speed
  result.name = way:get_value_by_key('name') or ''
end

function process_turn(profile, turn)
  if turn.is_u_turn then
    turn.duration = turn.duration + profile.properties.u_turn_penalty
    turn.weight = turn.weight + profile.properties.u_turn_penalty
  end

  if turn.has_traffic_light then
    turn.duration = turn.duration + profile.properties.traffic_light_penalty
  end

  if turn.angle ~= 0 then
    local abs_angle = math.abs(turn.angle)
    if abs_angle > 120 then
      turn.duration = turn.duration + profile.turn_penalty * 1.5
      turn.weight = turn.weight + profile.turn_penalty * 1.5
    elseif abs_angle > 60 then
      turn.duration = turn.duration + profile.turn_penalty
      turn.weight = turn.weight + profile.turn_penalty
    end
  end
end

return {
  setup = setup,
  process_way = process_way,
  process_node = process_node,
  process_turn = process_turn,
}
