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

/*
    Variable set up for the app
 */
var app = {
    initialize: function () {
        console.log('get heart rate now');
        reload_functions();
    },
};


// Main Function for the app
function reload_functions(){
    get_heart_rate();
    setTimeout(reload_functions, 1000);
}

/*
    Function to render data in the app
 */

function render_heart_rate(heart_rate){
    const target = document.getElementById('heart-rate-text');
    var hr = heart_rate;
    if (target) {
        target.innerHTML = hr;
        if (hr > 120 || hr < 50) {
            get_location();
        };
    };
}

function render_location(location){
    alert(`Heart Rate has fallen outside of safe boundaries. Call EMS for person located at ${location}`);
}

/*
    Functions to get data from the back end
 */

function get_heart_rate(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'HTTP://localhost:3000/users/get_rate');
    xhr.onload = function(){
        if (xhr.status === 200) {
            console.log(`rate found ${xhr.responseText}`);
            render_heart_rate(xhr.responseText);
        }
        else {
            console.log('Request error!')
        }
    };
    xhr.send();
}

function get_location(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'HTTP://localhost:3000/users/get_location');
    xhr.onload = function(){
        if (xhr.status === 200) {
            console.log(`location: ${xhr.responseText}`);
            render_location(xhr.responseText);
        }
        else {
            console.log('Request error!')
        }
    };
    xhr.send();
}