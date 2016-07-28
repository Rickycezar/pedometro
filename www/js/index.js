/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var globalDeviceReady = false;
var goApp = null;
document.addEventListener("deviceready", function() {
    console.log('DEVICE READY.');
    goApp = function() {
        var success = function(message) {
            console.log('SUCESSO!');
            console.log(message);
        };
        var failure = function(error) {
            alert("Error calling Plugin");
            alert(error);
        };
        var getData = function(message) {
            success(message);
            dataTypes = [
                'com.google.step_count.cadence',
                'com.google.step_count.delta'
            ];
            if (globalDeviceReady) {
                navigator.health.requestAuthorization(dataTypes, function (message) {
                    success(message);
                    globalDeviceReady = true;
                }, failure);
            } else {
                navigator.health.query({
                    startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
                    endDate: new Date(), // now
                    dataType: 'height'
                }, success, failure);
            }
        };

        console.log('Função iniciada...');
        navigator.health.isAvailable(getData, failure);

    }
}, false);

