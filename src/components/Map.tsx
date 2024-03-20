// @ts-nocheck

// import "./Map.css";

import * as d3 from "d3";
import { useD3 } from "../hooks/useD3";
import { useState } from "react";

import * as districtGeoData from "../data/bd_districts.geo.json";
import * as minMaxData from "../data/wb_clim_var_minmax.json";
import * as worldBankData from "../data/world_bank_data.json";
import riversGeoData from "../data/bd_rivers.geo.json";

// some css properties are added thru classes, those should be using tailwind
// some properties are added using js by fetching their id, those can stay as it is

const getClimateVariable = (
  district,
  variable,
  dataType,
  timeRange,
  climateChange,
) => {
  /**
   * Valid values for each:
   * variable: cdd65, hd35, hd40, hd45, prpercnt, r50mm, rx1day, rx5day, sd, tasmax, tasmin, tr26, tr29, txx
   * dataType: climatology, anomaly
   * timeRange: 1995-2014, 2020-2039, 2040-2059, 2060-2079, 2080-2099
   * climateChange: historical, ssp245, ssp370
   */
  // TODO make dynamic based on UI selectors and then remove the variable below
  // Currently climate emissions toggle doesn't work because it relies on timeRange to be a future value, so that has to be implemented first
  dataType = "climatology";
  console.log(variable, dataType, timeRange, climateChange);
  if (timeRange == "1995-2014") {
    return worldBankData[variable][dataType][timeRange]["historical"]["Dhaka"];
  } else {
    return worldBankData[variable][dataType][timeRange][climateChange]["Dhaka"];
  }
};

export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const datasetType = "climatology";
  const datasetName = "Surface Air Maximum";
  const datasetEmission = "ssp245";
  const datasetTimeline = "1995-2014";

  // TODO: gotta remove this from this file
  const datasetNameMap = {
    "Cooling Degree Days": "cdd65",
    "Hot Days Over 35°C": "hd35",
    "Hot Days Over 40°C": "hd40",
    "Hot Days Over 45°C": "hd45",
    "Precipitation Percent Change": "prpercnt",
    "Above 50mm": "r50mm",
    "Largest 1-Day Precipitation": "rx1day",
    "Largest 5-Day Precipitation": "rx5day",
    "Summer Days": "sd",
    "Surface Air Maximum": "tasmax",
    "Surface Air Minimum": "tasmin",
    "Maximum Over 26°C": "tr26",
    "Maximum Over 29°C": "tr29",
    "Single Day Maximum": "txx",
  };

  const ref = useD3(
    (svg: any) => {
      const variableDomain = {
        cdd65: minMaxData["cdd65"][datasetType],
        hd35: minMaxData["hd35"][datasetType],
        hd40: minMaxData["hd40"][datasetType],
        hd45: minMaxData["hd45"][datasetType],
        prpercnt: minMaxData["prpercnt"][datasetType],
        r50mm: minMaxData["r50mm"][datasetType],
        rx1day: minMaxData["rx1day"][datasetType],
        rx5day: minMaxData["rx5day"][datasetType],
        sd: minMaxData["sd"][datasetType],
        tasmax: minMaxData["tasmax"][datasetType],
        tasmin: minMaxData["tasmin"][datasetType],
        tr26: minMaxData["tr26"][datasetType],
        tr29: minMaxData["tr29"][datasetType],
        txx: minMaxData["txx"][datasetType],

        // Legacy Hybdrid Data (to be removed)
        maxTemperature: minMaxData["tasmax"][datasetType],
        // minTemperature: "minTemperature",
        // hotTropical: "nDaysTminMoreThan26",
      };

      // Create a reversed version of the RdYlBu color scheme
      const reversedRdYlBu = (t: number) => d3.interpolateRdYlBu(1 - t);
      const reversedRdBu = (t: number) => d3.interpolateRdBu(1 - t);

      const variableColourScheme = {
        // Hot Weather
        cdd65: d3.interpolateYlOrBr,
        hd35: d3.interpolateYlOrBr,
        hd40: d3.interpolateYlOrRd,
        hd45: d3.interpolateOrRd,
        sd: d3.interpolateYlOrBr,

        // Precipitation
        prpercnt: d3.interpolateBlues,
        r50mm: d3.interpolateBlues,
        rx1day: d3.interpolateBlues,
        rx5day: d3.interpolateBlues,

        // Temperature
        tasmax: d3.interpolateOrRd,
        tasmin: d3.interpolateYlOrBr,
        tr26: d3.interpolateYlOrBr,
        tr29: d3.interpolateYlOrRd,
        txx: d3.interpolateOrRd,
      };

      const variableLabelMap = {
        cdd65: "Cooling Degree Days (ref-18°C)",
        hd35: "No. of Hot Days (> 35°C)",
        hd40: "No. of Hot Days (> 40°C)",
        hd45: "No. of Hot Days (> 45°C)",
        prpercnt: "Ppt % Change",
        r50mm: "No. of Days w/ ppt.>50mm",
        rx1day: "Avg. Largest 1-Day ppt.",
        rx5day: "Average Largest 5-Day Cumul. ppt.",
        sd: "No. of Summer Days (> 25°C)",
        tasmax: "Avg. Max Temperature",
        tasmin: "Avg. Min Temperature",
        tr26: "No. of Tropical Nights (> 26°C)",
        tr29: "No. of Tropical Nights (> 29°C)",
        txx: "Max of Daily Max-Temp.",
      };

      const unitMap = {
        cdd65: "Days",
        hd35: "Days",
        hd40: "Days",
        hd45: "Days",
        prpercnt: "%",
        r50mm: "Days",
        rx1day: "mm",
        rx5day: "mm",
        sd: "Days",
        tasmax: "°C",
        tasmin: "°C",
        tr26: "Days",
        tr29: "Days",
        txx: "°C",
      };

      /**
       * Use D3 to draw the colour legend, the variable coloured districts and
       * add tooltip on hover, and onClick functionality for the districts
       */

      const projection = d3
        .geoMercator()
        .fitSize([2160, 2160], districtGeoData);

      const colorScale = d3
        .scaleSequential()
        .domain(variableDomain[datasetNameMap[datasetName]])
        .interpolator(variableColourScheme[datasetNameMap[datasetName]]);

      const path = d3.geoPath().projection(projection);

      d3.select("#legend-svg").selectAll("*").remove();

      let legend = d3
        .select("#legend-svg")
        .append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${20}, 32)`)
        .attr("width", 800)
        .attr("height", 80)
        .attr("font", "12px");

      let legendScale = d3
        .scaleLinear()
        .domain(variableDomain[datasetNameMap[datasetName]])
        .range([0, 200]);

      // Create a colour horizontal gradient for the legend
      let legendGradient = legend
        .append("defs")
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

      // Create the colour stops for the gradient
      legendGradient
        .append("stop")
        .attr("offset", "0%")
        .attr(
          "stop-color",
          colorScale(variableDomain[datasetNameMap[datasetName]][0]),
        );
      legendGradient
        .append("stop")
        .attr("offset", "50%")
        .attr(
          "stop-color",
          colorScale(
            (variableDomain[datasetNameMap[datasetName]][0] +
              variableDomain[datasetNameMap[datasetName]][1]) /
              2,
          ),
        );
      legendGradient
        .append("stop")
        .attr("offset", "100%")
        .attr(
          "stop-color",
          colorScale(variableDomain[datasetNameMap[datasetName]][1]),
        );

      // Draw the gradient rect
      legend
        .append("rect")
        .attr("width", 200)
        .attr("height", 20)
        .style("fill", "url(#legend-gradient)");

      // Create a scale for the legend
      let legendAxis = d3.axisBottom(legendScale).ticks(5);

      // Draw the legend axis
      legend
        .append("g")
        .attr("class", "legend-axis")
        .attr("transform", "translate(0, 20)")
        .attr("width", 200)
        .attr("height", 20)
        .call(legendAxis);

      // Add a variable title
      legend
        .append("text")
        .attr("x", 0)
        .attr("dy", "-0.5em")
        .attr("text-align", "center")
        .text(variableLabelMap[datasetNameMap[datasetName]]);

      // svg.attr("width", 1280).attr("height", 1280);

      let districtGroup = svg.select("#districts");
      // Add districts group element if it doesn't already exist
      if (districtGroup.empty()) {
        districtGroup = svg.append("g").attr("id", "districts");
      }

      let riversGroup = svg.select("#rivers");
      // Add rivers group element if it doesn't already exist
      if (riversGroup.empty()) {
        riversGroup = svg.append("g").attr("id", "rivers");
      }

      // Draw districts
      districtGroup
        .selectAll("path")
        .data(districtGeoData.features)
        .join("path")
        .attr("class", "district")
        .attr("d", path)
        .attr("stroke", (d) => {
          // Set a specific stroke color for a specific district
          if (d.properties["NAME_3"] === selectedDistrict) {
            return "#000"; // Set the desired stroke color
          } else {
            return "#000"; // Default stroke color for other districts
          }
        })
        .attr("stroke-width", (d) => {
          // Set a specific stroke color for a specific district
          if (d.properties["NAME_3"] === selectedDistrict) {
            return "4"; // Set the desired stroke color
          } else {
            return "0.5"; // Default stroke color for other districts
          }
        })
        // .attr("id", districtGeoData.features.)
        .attr("fill", (d) => {
          let value = getClimateVariable(
            d.properties["NAME_3"],
            datasetNameMap[datasetName],
            datasetType,
            datasetTimeline,
            datasetEmission,
          );
          return colorScale(value);
        })
        .on("mouseover", (event, d) => {
          let stories = climateStories[d.properties["NAME_3"]];
          let entities = ngoDataByDistrict[d.properties["NAME_3"]];

          // TODO Ensure when these end up empty, it is for intended reasons (e.g no stories or entities)

          let storiesLength =
            stories?.impact?.length + stories.resilience?.length;
          let entitiesLength =
            entities == "" || entities == undefined ? 0 : entities.length;
          d3
            .select("#tooltip")
            .style("display", "flex")
            .style("left", event.pageX + 0 + "px")
            .style("top", event.pageY + 0 + "px").html(`
                        <div class="tooltip-row">
                            <span class="tooltip-title">${
                              d.properties["NAME_3"]
                            }</span>
                            <ul class="tags">
                                ${districtMetaData[d.properties["NAME_3"]][
                                  "tags"
                                ]
                                  .map((i) => {
                                    return `<li>${i}</li>`;
                                  })
                                  .join("")}
                            </ul >
                        <div class="tooltip-temp-div">
                            <h4>${datasetConfig["name"]}</h4>
                            <span class="tooltip-temp">${getClimateVariable(
                              d.properties["NAME_3"],
                              datasetNameMap[datasetName],
                              datasetType,
                              datasetTimeline,
                              datasetEmission,
                            )} ${unitMap[datasetNameMap[datasetName]]}
                            </span>
                        </div>
                                    </div >
                        <div class="tooltip-row">
                            <span class="tooltip-story-count">${storiesLength} Stories</span>
                            <span class="tooltip-period">&#x2022;</span>
                            <span class="tooltip-entity-count">${entities?.length ? entities.length : 0} Entities</span>
                        </div>
                    `);
          // On hover, increase the border width
          d3.select(event.target).attr("stroke-width", "3");
          //d3.select(event.target).attr("stroke", "#000")
        })
        .on("mouseout", (event, d) => {
          // On mouseout, reset the border width
          if (d.properties["NAME_3"] !== selectedDistrict) {
            d3.select(event.target).attr("stroke-width", "0.5");
          }
          //d3.select(event.target).attr("stroke-width", "0.5");
          //d3.select(event.target).attr("stroke", "#fff")
          d3.select("#tooltip").style("display", "none");
        })
        .on("click", (event, d) => {
          // Render out the district name to the district-info div
          d3.select(event.target).attr("stroke", "#000");
          d3.select(event.target).attr("stroke-width", "4");
          generatedDistricts.districts.forEach((generatedD) => {
            if (generatedD.name == d.properties.NAME_3) {
              handleDistrictIdChange(generatedD.id);
              setSelectedDistrict(generatedD.name);
            }
          });
          setSidebarActive(true);
        });

      // Draw rivers
      riversGroup
        .selectAll("path")
        .data(riversGeoData.features)
        .join("path")
        .attr("class", "river")
        .attr("d", path)
        // .attr("stroke", "#ffff")
        .attr("stroke-width", "0.5")
        .attr("fill", "#d5dff4");

      // Enable zoom and pan functionality for map
      d3.select("#map-vis").call(
        d3
          .zoom()
          .scaleExtent([0.22, 1.2]) // Set the minimum and maximum zoom levels
          // .translateExtent([[-100, 100], [-100, 100]]) // Set the allowed panning extent
          .on("zoom", (e) => {
            // NOTE: We select the parent #map-vis element as a reference point for the mouse
            // The transform is applied to the child #map-vis-group element
            svg.attr("transform", e.transform);
          }),
      );
    },
    [datasetName, datasetEmission, datasetTimeline, selectedDistrict],
  ); //[datasetName, datasetEmission, datasetTimeline]);

  return (
    <>
      <div className="map-container relative flex justify-center">
        <div id="tooltip"></div>
        <div id="legend" className="absolute right-0 top-2">
          <svg id="legend-svg" width="240" height="80"></svg>
        </div>

        <svg
          id="map-vis"
          className="map h-screen"
          style={{
            width: "100%",
          }}
        >
          <g id="map-vis-group" ref={ref}></g>
        </svg>
        <div id="district-info" className="district-content"></div>
      </div>
    </>
  );
  // return <p>map will be here</p>;
}
