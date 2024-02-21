import React, { useEffect, useState } from "react";
import Point from '@arcgis/core/geometry/Point';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Map from '@arcgis/core/Map';
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Bookmarks from "@arcgis/core/widgets/Bookmarks"
import Bookmark from "@arcgis/core/webmap/Bookmark.js";
import MapView from '@arcgis/core/views/MapView';
import esriConfig from "@arcgis/core/config.js";

export default function ArcgisMap (props){

    const [marks, setMarks] = useState([]);
    let bookmarks ;
    // const mapDiv = useRef(null);
    useEffect(() =>{

        esriConfig.apiKey = "AAPKae2a40767592460cb54f98756c8579053CZHfV2nsyRUZFSbUVLCBS1poOYx5GBSCwaj9nhJL3yjzggs94pMrjDgZtozhg-0"

            const webmap = new Map({
              basemap: "streets"   //arcgis/topographic
            });
      
            const view = new MapView({
              container: "viewDiv",      //mapDiv.current, // The id or node representing the DOM element containing the view.
              map: webmap, // An instance of a Map object to display in the view.
              center: [114.123489,22.370157],
              zoom: 11 // Represents the map scale at the center of the view.
            });  

            let point1 = new Point({
                latitude: 22.324254130795985,  // lat
                longitude: 114.213888605773676,       //lng
                // spatialReference: spatialReference
              });

            const featureLayer = new FeatureLayer({
               // create an instance of esri/layers/support/Field for each field object
                source: [],
                title: "Candidates",
                fields: [
                    {
                        name: "ObjectID",
                        alias: "ObjectID",
                        type: "oid"
                    },
                    {
                        name: "store_id",
                        alias: "store_id",
                        type: "string"
                    },
                    {
                        name: "facilities",
                        alias: "facilities",
                        type: "integer"
                    },
                    {
                        name: "score",
                        alias: "score",
                        type: "integer"
                    },
                    {
                        name: "rent",
                        alias: "rent",
                        type: "integer"
                    },
                    {
                        name: "score",
                        alias: "score",
                        type: "integer"
                    }
                ],
                objectIdField: "ObjectID",
                geometryType: "point",
                spatialReference: { wkid: 4326 },
                renderer: {
                    type: "simple",
                    symbol: {
                      type: "web-style", // autocasts as new WebStyleSymbol()
                      styleName: "Esri2DPointSymbolsStyle",
                      name: "restaurant"
                    }
                  },
                popupTemplate: {
                  title: "Store ID: {store_id}",
                  content: [
                    {
                      type: "fields",
                      fieldInfos: [
                        {
                          fieldName: "score",
                          label: "Score"
                        },
                        {
                            fieldName: "facilities",
                            label: "Facilities"
                          },
                        {
                          fieldName: "rent",
                          label: "Rent"
                        }
                      ]
                    }
                  ]
                }
              });
      
              webmap.add(featureLayer); 

            const addFeatures =(props)=>{
                    // create an array of graphics based on the data above
                    let graphics = [];
                    let graphic;
                    let bmark;
                    if( props.allPlaces) {  //props.schedule &&
                        for (let i = 0; i < props.allPlaces.length; ++i) {
                            graphic = new Graphic({
                            geometry: {
                                type: "point",
                                latitude: props.allPlaces[i].lat,
                                longitude: props.allPlaces[i].lng
                                },
                            attributes: props.allPlaces[i]
                            });

                        graphics.push(graphic);

                        setMarks([]);

                          bmark=  new Bookmark({
                            name: "Candidate "+ props.allPlaces[i].store_id,
                            viewpoint: {
                              targetGeometry: {
                                // type: "extent",
                                // spatialReference: {
                                //   wkid: 102100
                                // },
                                type: "point",
                                latitude: props.allPlaces[i].lat,
                                longitude: props.allPlaces[i].lng
                                // xmin: props.allPlaces[i].lat,   //-13139131.948889678,
                                // ymin: props.allPlaces[i].lng-0.11,   //4047767.23531948,
                                // xmax: props.allPlaces[i].lat,  //-13092887.54677721,
                                // ymax: props.allPlaces[i].lng+0.11,   ///4090610.189673263
                              }
                            }
                          });
                        marks.push(bmark)                         
                        }

                         bookmarks = new Bookmarks({
                            view: view,
                            bookmarks: marks
                          });   
                    }

                    const addEdits = {
                        addFeatures: graphics
                    };
                    console.log('addFeature -----')
        
                    // apply the edits to the layer
                    applyEditsToLayer(addEdits);
            }
             
      
            const applyEditsToLayer =(edits)=> {
                console.log("applyEditsToLayer---");
                featureLayer
                 .applyEdits(edits)
                 .then((results) => {
                 })
                 .catch((error) => {
                   console.error();
                 });
             }

             if(props.allPlaces[0]){
                console.log(props.allPlaces[0]);
                addFeatures(props)
                // Add the widget to the top-right corner of the view
              view.ui.add(bookmarks, {
                position: "top-left"
              });
             } 

             
      
              
 
    },[props.allPlaces])     



   
    return (
        <div id="viewDiv"  style={{ height: "750px", width: "1000px" }}>
        </div>
    );
}


