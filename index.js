/*
* Copyright 2018 Joachim Bakke
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const util = require('util');
//const moment = require("moment")
const utilSK = require('@signalk/nmea0183-utilities');
//const countries = require('i18n-iso-countries')
//var obj = require("./schema.json"); //require empty schema
const _ = require('lodash');


module.exports = function(app, options) {
  'use strict';
  var client;
  var context = "vessels.*";

  return {
    id: "signalk-resources",
    name: "Resource manager",
    description: "Plugin to manage resources such as routes",

    schema: {
      title: "Signal K resource manager",
      type: "object",
      properties: {
      }
    },

    start: function(options) {},

    registerWithRouter: function(router) {
      app.get('/signalk/v1/api/resources/routes$', (req, res) => {
        res.contentType('application/json');
        var empty = {}
        res.send(empty)

    },

    stop: function() {
      debug("Stopped")
    }
  }
}
