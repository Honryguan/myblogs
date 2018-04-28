import carIcon from '../assets/track/car.png';

//获取地址
export function handleMap(data, opts){
  	var map = new BMap.Map("map");
  	var point = new BMap.Point(113.316,23.14);
	map.centerAndZoom(point, 15);
	map.enableScrollWheelZoom();
}

//将84坐标转换为百度坐标
function changeBaiduPoint(points, translateCallback){
	var convertor = new BMap.Convertor();
	var results = new Array;
	changePoint(points, results, convertor, translateCallback);
}

function changePoint(points, returnPoints, convertor, translateCallback){
	let pnts = points.slice(0, 10);
	convertor.translate(pnts, 1, 5, function(results){
		if(results.status === 0){
			returnPoints = returnPoints.concat(results.points);
			if(points.length > 10){
				changePoint(points.slice(10), returnPoints, convertor, translateCallback);
			}else{
				translateCallback({status:0, points:returnPoints});
			}
		}else{
			translateCallback(results);
		}
		
	});
}

function addClickHandler(content, marker, map, opts){
	marker.addEventListener("click",function(e){
			openInfo(content, e, map, opts);
		}
	);
}

//打开信息提示框
function openInfo(content, e, map, opts){
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	var infoWindow = new BMap.InfoWindow(content,opts); 
	map.openInfoWindow(infoWindow,point); 
}	

//根据坐标获取地址信息
function getAddress(longitude, latitude, generateContent){
	var point = new BMap.Point(longitude, latitude);
	var geoc = new BMap.Geocoder();    
	var result = "";
	geoc.getLocation(point, function(rs){
		let addComp = rs.addressComponents;
		result = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
		generateContent(result);
	});     
}

//获取路线
export function drawCarPath(data, opts){
  	let map = new BMap.Map("map");
  	map.clearOverlays();
	let point = new BMap.Point(116.404, 39.915);
	map.centerAndZoom(point, 15);
	let longitude = 0, latitude = 0, trackLng = 0, trackLat = 0, length = 0;
	data && data.length && data.forEach(function(route, index){
		var tracks = route.tracks;
		length = length + tracks.length;

		//当前位置坐标
		let track = route.track;
		if(track){
			trackLng = track.longitude;
			trackLat = track.latitude;
			let point = new BMap.Point(Number(trackLng), Number(trackLat));

			function afterGetBaiuPoint(returnPoints){
				if(returnPoints.status !== 0) return;
				let currentPoint = returnPoints.points[0];
				let myIcon = new BMap.Icon(carIcon, new BMap.Size(50,50));
				let marker = new BMap.Marker(point, {icon: myIcon}); 
			
				
				getAddress(currentPoint.lng, currentPoint.lat, generatorContent);
			}
			changeBaiduPoint([point], afterGetBaiuPoint);
		}
		
		//轨迹坐标
		if(tracks && tracks.length){
			var linePoints = [];
			var str = "";
			tracks.forEach(function(item) {
				let point = new BMap.Point(Number(item.longitude), Number(item.latitude));   
				linePoints.push(point);
				//str = str + item.longitude + "," + item.latitude + ";"
			});
			//console.log(str);

			function after(returnPoints){
				if(returnPoints.status !== 0) return;
				returnPoints.points.forEach(function(item, inx){
					longitude = longitude + Number(item.lng);
					latitude = latitude + Number(item.lat);
				});
				map.addOverlay(addLine(returnPoints.points));
				if(longitude != 0 && latitude != 0){
					if(length == 0){
						length = 1;
					}
					var p = new BMap.Point(longitude/length, latitude/length);
					map.centerAndZoom(p, 10);
				}
			}

			changeBaiduPoint(linePoints, after);
		}
	});
	if(trackLng != 0 && trackLat!=0){
		var p = new BMap.Point(trackLng, trackLat);
		map.centerAndZoom(p, 10);
	}
	map.enableScrollWheelZoom(true);
}

function addLine(points) { //添加折线
	return new BMap.Polyline(points, {
		strokeColor: "#0C80FD", 
		strokeWeight: 3, 
		strokeOpacity: 1
	});    
}