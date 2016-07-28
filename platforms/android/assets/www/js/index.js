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
//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};

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


        //function onSuccess(acceleration) {
        //    console.log(acceleration);
        //    console.log('Acceleration X: ' + acceleration.x + '\n' +
        //        'Acceleration Y: ' + acceleration.y + '\n' +
        //        'Acceleration Z: ' + acceleration.z + '\n' +
        //        'Timestamp: '      + acceleration.timestamp + '\n');
        //};
        //
        //function onError() {
        //    console.log('onError!');
        //};
        console.log('Função iniciada...');
        navigator.health.isAvailable(getData, failure);
        //navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);


        //navigator.PedometerCordova.init(function(data) {
        //    console.log(data);
        //    console.log('SUCESSO!');
        //
        //    navigator.PedometerCordova.start();
        //    console.log('iniciando contador...');
        //    setTimeout(function() {
        //        console.log('parando contador...');
        //        navigator.PedometerCordova.stop();
        //    }, 5000);
        //});


        //stepcounter.start(startingOffset, function(message) {
        //    console.log('contador iniciado...');
        //    setTimeout( function() {
        //        console.log('parando contador...');
        //        stepcounter.stop(function (message) {
        //            setTimeout(function () {
        //                console.log('retornando valores...');
        //                stepcounter.getTodayStepCount(success, failure);
        //                stepcounter.getStepCount(success, failure);
        //                stepcounter.deviceCanCountSteps(success, failure);
        //                stepcounter.getHistory(
        //                    function(historyData){
        //                        success(historyData);
        //                    },
        //                    failure
        //                );
        //            }, 1000);
        //        }, failure);
        //    }, 5000);
        //}, failure);
    }
}, false);

