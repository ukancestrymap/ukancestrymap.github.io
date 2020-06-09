(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},152:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),o=a(21),i=a.n(o),l=(a(100),a(58)),r=a(38),d=a(22),p=a(23),c=a(28),h=a(27),m=a(29),_=a(49),u=a.n(_),g=a(59),w=a.n(g),f=(a(47),a(36)),y=a(86),v=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).updateDimensions=function(){a.setState({height:a.svg_ref.clientHeight,width:a.svg_ref.clientWidth})},a.state={width:100,height:100},a}return Object(m.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions.bind(this))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateDimensions.bind(this))}},{key:"render",value:function(){var e,t,a,s=this;if(this.props.uk_geojson&&this.props.postcode_data.has_data()){var o=Object(y.a)().domain([this.props.color_range[0],this.props.color_range[1]]).range(["white","blue"]),i=Object(f.a)().center([5,54.4]).rotate([4.4,0]).parallels([50,60]).fitExtent([[0,0],[.9*this.state.width,.9*this.state.height]],this.props.uk_geojson),l=Object(f.c)().projection(i);e=this.props.uk_geojson.features.map(function(e,t){var a=s.props.postcode_data.get_data(t).mean;return isNaN(a)?n.a.createElement("path",null):n.a.createElement("path",{key:"path"+t,d:l(e),fill:o(a),onClick:function(e){s.props.select_postcode(t)},onMouseOver:function(e){s.props.mouseover_postcode(t)},stroke:"rgba(0,0,0,0.5)",strokeWidth:1,className:"postcodes"})}),a=this.props.uk_geojson.features.filter(function(e,t){return t===s.props.highlight_postcode}).map(function(e){return n.a.createElement("path",{className:"postcode_highlight",key:"highlight path",d:l(e),fill:"none",stroke:"green",strokeWidth:2.5})}),t=this.props.uk_geojson.features.filter(function(e,t){return t===s.props.selected_postcode}).map(function(e){return n.a.createElement("path",{className:"postcode_highlight",key:"selected postcode",d:l(e),fill:"none",stroke:"red",strokeWidth:2.5})})}return n.a.createElement("svg",{ref:function(e){return s.svg_ref=e},className:"UkMap",width:"100%",height:"100%"},e,a,t)}}]),t}(n.a.Component),b=a(79),k=a(162),x=a(39),E=a(24),S=a(154),O=a(155),j=a(156),N=a(157),C=a(158),T=a(159),L=a(160),D=a(31),W=a(161),B=a(163),H=a(90),P={IBD:"IBD",fN:"fN"},I={ibd_segments:"number of ancestors",genome_fraction:"percent shared genome",mutations:"mutations"},A=function(e){function t(){return Object(d.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return n.a.createElement(k.a,null,n.a.createElement(x.a,{icon:"help",intent:E.a.PRIMARY}),n.a.createElement(S.a,{className:"help"},this.props.string))}}]),t}(n.a.Component),M=function(e){function t(){return Object(d.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"options-row"},n.a.createElement("div",{className:"options-column1"},this.props.label),n.a.createElement(O.a,{id:this.props.labelFor,className:"options-column2",fill:!0,options:this.props.options,onChange:this.props.onChange,value:this.props.options[this.props.value]}),n.a.createElement(A,{className:"options-column3",string:this.props.longHelperText}))}}]),t}(n.a.Component),R=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).handleAndvancedChange=function(){a.setState({advanced:!a.state.advanced})},a.state={editing_postcode:!1,editing_postcode_text:"",advanced:!1,more_information:!1},a}return Object(m.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.props.postcode_data.get_thresholds().map(function(t){return e.props.threshold_scale*t}),a=this.props.threshold_scale*this.props.display_timespan,s=t[0],o=t[t.length-1],i=Math.round((o-s)/5),l=this.props.postcode_data.min(),r=this.props.postcode_data.max(),d=(r-l)/4,p=this.props.color_range;p[0]<l&&(p[0]=l),p[1]>r&&(p[1]=r);var c=this.props.display_pop_options.map(function(e){return P[e]}),h=this.props.display_data_options.map(function(e){return I[e]}),m=this.state.editing_postcode_text;this.props.postcode_names&&!this.state.editing_postcode&&(m=this.props.postcode_names[this.props.selected_postcode]);var _=n.a.createElement("div",null,n.a.createElement(j.b,null,"Display Options"),n.a.createElement(M,{helperText:"some more info here...",label:"Dataset",labelFor:"dataset-input",options:c,onChange:this.props.display_pop_callback,value:this.props.display_pop_index,longHelperText:"Select the type of data you want to display on the map. \u201cIBD\u201d (identical-by-descent, currently the only available option) will display data about genetic relationships between UK post codes in the past 300 to 1500 years (depending on the value of \u201cTime threshold\u201d, which you can set below). The intensity of the color will reflect how close the genetic relationships are between the selected region (in red) and all other regions. Regions always colored in white are post codes for which not enough data is available for this analysis. Move the mouse over a specific region to highlight it in green. Additional data can be found in the box below. Use \u201cShow advanced\u201d to reveal additional parameters."}),n.a.createElement(M,{helperText:"some more info here...",label:"Datatype",labelFor:"datatype-input",options:h,onChange:this.props.display_data_callback,value:this.props.display_data_index,longHelperText:'Select what specific feature of genetic ancestry you want to display on the map. If you select "percent shared genome", the colors and numbers will reflect the percentage of genome that is shared identical-by-descent (IBD) for two average individuals from the selected regions between present day and the selected time threshold. For instance, 6.6% of the genome of two individuals from Lerwick (ZE) is co-inherited from common ancestors who lived between today and 1,500 years ago (this number is usually very small, as only a small fraction of genome is usually co-inherited from ancestors living in the recent centuries). If you select "number of ancestors", the map will reflect the number of shared genetic ancestors two individuals from the selected regions share on average between today and the selected time threshold. For instance, two individuals from Llandudno (LL) have on average 2.6 shared genetic ancestors in the past 1,500 years, but an individual from Llandudno shares on average less than one (0.87) common genetic ancestor in the past 1,500 years with an individual from the neighboring region of Chester (CH) (the number of shared genetic ancestors in the recent centuries is also usually quite small).'}),n.a.createElement(N.a,{helperText:"ancestry calculated this many years in the past",label:"Time threshold",labelFor:"threshold-input"},n.a.createElement(C.a,{id:"threshold-input",min:s,max:o,stepSize:i/10,labelStepSize:i,onChange:this.props.display_timespan_callback,value:a})),n.a.createElement(N.a,{helperText:"area postcode (e.g. S or HA)",label:"Postcode",labelFor:"postcode-input",inline:!0},n.a.createElement(T.a,{id:"postcode-input",leftIcon:"geosearch",placeholder:"Enter postcode...",onFocus:function(){return e.setState({editing_postcode:!0})},onBlur:function(){return e.setState({editing_postcode:!1})},value:m,onChange:function(t){e.setState({editing_postcode_text:t.target.value})},onKeyPress:function(t){13===t.which&&e.props.select_postcode(e.state.editing_postcode_text)}}))),u=n.a.createElement("div",null,n.a.createElement(N.a,{helperText:"select the range of colors to display in the map",label:"Color Range",labelFor:"color-range-input"},n.a.createElement(M,{label:"Mode",labelFor:"mode-input",options:["second largest","95% percentiles","set by user"],onChange:this.props.color_range_mode_callback,value:this.props.color_range_mode,longHelperText:'This option lets you select the color range used in the map, which enables magnifying ancestry patterns in a specific interval of genetic relatedness. Clicking on different regions, you will notice that the strongest genetic relationships are always found between pairs of individuals living in the same post code. For instance, individuals from Birmingham (B) have closer genetic ties with other individuals from Birmingham than with individuals from any other post code. The same is true for all regions, including cosmopolitan areas such as London. This demonstrates that there has been limited movement of genetic ancestors ("gene flow") during recent centuries ("isolation by distance"). If the color range is set such that the brightest color reflects the sharing of no common ancestry (i.e. no IBD sharing) and the darkest color is set to reflect the largest sharing of ancestry found in the data set for the selected region, the map will become very light for all but the selected region. This makes it hard to detect any ancestry sharing patterns other than the sharing within post codes (you may try this by manually changing the color range to minimum and maximum allowed values after selecting the "set by user" option). To help magnify patterns of intermediate genetic relatedness across regions, you may select "second largest", or "95% percentiles". If you select "second largest", the lightest color will represent the sharing of 0 ancestors (and thus 0% of the genome), while the darkest color will represent the second largest value found in the data set for the selected region. Selecting "95% percentiles" ignores the bottom 5% and the top 5% regions, setting the lightest color to the 5th percentile of IBD sharing for a region, and the darkest color to the 95th percentile. These options help magnifying interesting ancestry patterns in the data.'}),n.a.createElement(L.a,{id:"color-range-input",min:l,max:r,stepSize:.01*d,labelStepSize:d,value:p,labelPrecision:2,disabled:2!==this.props.color_range_mode,onChange:this.props.color_range_callback})),n.a.createElement(N.a,{helperText:"use this URL to save your current parameters",label:"Copy parameters",labelFor:"parameter-input"},n.a.createElement(T.a,{id:"parameter-input",leftIcon:"bookmark",readOnly:!0,value:this.props.parameters_string})));return n.a.createElement(S.a,{interactive:!1,elevation:D.a.TWO},_,n.a.createElement(W.a,{checked:this.state.advanced,label:"Show advanced",onChange:this.handleAndvancedChange}),this.state.advanced&&u,n.a.createElement(B.a,{text:"More Information",intent:"primary",onClick:this.createOverlayHandler("more_information")}),n.a.createElement(H.a,{className:"Overlay",isOpen:this.state.more_information},n.a.createElement(S.a,{interactive:!1,elevation:D.a.TWO},n.a.createElement(j.a,null,"More Information"),n.a.createElement("p",null,"This website was developed by Martin Robinson, Juba Nait-Saada, and Pier Palamara, as part of research done at the University of Oxford, UK. The data reflects genetic relatedness in the past 1,500 years among samples from the UK Biobank data set, which contains the genomes of about 500,000 donors from the UK."),n.a.createElement("p",null,"We welcome feedback, bug reports, and comments on patterns reflecting historical or demographic events you may find in the data."),n.a.createElement("p",null,"Additional details on the analysis are available at ",n.a.createElement("a",{href:"https://www.biorxiv.org/content/10.1101/2020.04.20.029819v1"},"https://www.biorxiv.org/content/10.1101/2020.04.20.029819v1"),"."),n.a.createElement("p",null,"To contact us please write to Pier using <lastnamelowercase>@stats.ox.ac.uk."),n.a.createElement(B.a,{text:"Close",onClick:this.createOverlayHandler("more_information")}))))}},{key:"createOverlayHandler",value:function(e){var t=this;return function(){t.setState(Object(b.a)({},e,!t.state[e]))}}}]),t}(n.a.Component),F=a(89),U={AB:{samples:{all:1542,white:1433},name:"Aberdeen"},AL:{samples:{all:2455,white:1918},name:"St Albans"},B:{samples:{all:17345,white:14597},name:"Birmingham"},BA:{samples:{all:763,white:709},name:"Bath"},BB:{samples:{all:3689,white:3458},name:"Blackburn"},BD:{samples:{all:190,white:177},name:"Bradford"},BH:{samples:{all:935,white:818},name:"Bournemouth"},BL:{samples:{all:11395,white:10368},name:"Bolton"},BN:{samples:{all:0,white:0},name:"Brighton"},BR:{samples:{all:565,white:510},name:"Bromley"},BS:{samples:{all:16508,white:15119},name:"Bristol"},BT:{samples:{all:974,white:884},name:"Belfast"},CA:{samples:{all:1618,white:1508},name:"Carlisle"},CB:{samples:{all:1310,white:1121},name:"Cambridge"},CF:{samples:{all:8696,white:7782},name:"Cardiff"},CH:{samples:{all:2490,white:2246},name:"Chester"},CM:{samples:{all:1344,white:1184},name:"Chelmsford"},CO:{samples:{all:715,white:626},name:"Colchester"},CR:{samples:{all:0,white:0},name:"Croydon"},CT:{samples:{all:1072,white:970},name:"Canterbury"},CV:{samples:{all:2720,white:2374},name:"Coventry"},CW:{samples:{all:311,white:293},name:"Crewe"},DA:{samples:{all:1485,white:1314},name:"Dartford"},DD:{samples:{all:1418,white:1280},name:"Dundee"},DE:{samples:{all:6504,white:6064},name:"Derby"},DG:{samples:{all:635,white:571},name:"Dumfries"},DH:{samples:{all:11851,white:11119},name:"Durham"},DL:{samples:{all:2985,white:2784},name:"Darlington"},DN:{samples:{all:1172,white:1086},name:"Doncaster"},DT:{samples:{all:326,white:305},name:"Dorchester"},DY:{samples:{all:571,white:514},name:"Dudley"},E:{samples:{all:70,white:61},name:"East London"},EC:{samples:{all:10884,white:7838},name:"East Central London"},EH:{samples:{all:419,white:367},name:"Edinburgh"},EN:{samples:{all:6643,white:5644},name:"Enfield"},EX:{samples:{all:1132,white:1019},name:"Exeter"},FK:{samples:{all:1719,white:1496},name:"Falkirk"},FY:{samples:{all:1860,white:1683},name:"Blackpool"},G:{samples:{all:15625,white:12970},name:"Glasgow"},GL:{samples:{all:2528,white:2312},name:"Gloucester"},GU:{samples:{all:1363,white:1190},name:"Guildford"},HA:{samples:{all:3854,white:3078},name:"Harrow"},HD:{samples:{all:1938,white:1775},name:"Huddersfield"},HG:{samples:{all:2510,white:2345},name:"Harrogate"},HP:{samples:{all:2138,white:1899},name:"Hemel Hempstead"},HR:{samples:{all:685,white:638},name:"Hereford"},HS:{samples:{all:210,white:197},name:"Outer Hebrides"},HU:{samples:{all:2484,white:2302},name:"Hull"},HX:{samples:{all:3998,white:3657},name:"Halifax"},IG:{samples:{all:4208,white:3598},name:"Ilford"},IP:{samples:{all:955,white:838},name:"Ipswich"},IV:{samples:{all:788,white:727},name:"Inverness"},KA:{samples:{all:1206,white:1093},name:"Kilmarnock"},KT:{samples:{all:2627,white:2273},name:"Kingston upon Thames"},KW:{samples:{all:173,white:162},name:"Kirkwall"},KY:{samples:{all:10546,white:9467},name:"Kirkcaldy"},L:{samples:{all:24114,white:21395},name:"Liverpool"},LA:{samples:{all:1656,white:1535},name:"Lancaster"},LD:{samples:{all:141,white:129},name:"Llandrindod Wells"},LE:{samples:{all:3524,white:3205},name:"Leicester"},LL:{samples:{all:718,white:656},name:"Llandudno"},LN:{samples:{all:1448,white:1339},name:"Lincoln"},LS:{samples:{all:21759,white:19455},name:"Leeds"},LU:{samples:{all:1374,white:1211},name:"Luton"},M:{samples:{all:1917,white:1784},name:"Manchester"},ME:{samples:{all:899,white:799},name:"Rochester"},MK:{samples:{all:1342,white:1153},name:"Milton Keynes"},ML:{samples:{all:3024,white:2501},name:"Motherwell"},N:{samples:{all:521,white:446},name:"North London"},NE:{samples:{all:21305,white:19959},name:"Newcastle upon Tyne"},NG:{samples:{all:14987,white:13710},name:"Nottingham"},NN:{samples:{all:1901,white:1691},name:"Northampton"},NP:{samples:{all:3538,white:3230},name:"Newport"},NPT:{samples:{all:4509,white:4194},name:"Newport"},NR:{samples:{all:1308,white:1196},name:"Norwich"},NW:{samples:{all:5869,white:3969},name:"North West London"},OL:{samples:{all:18852,white:16548},name:"Oldham"},OX:{samples:{all:5206,white:4731},name:"Oxford"},PA:{samples:{all:1114,white:979},name:"Paisley"},PE:{samples:{all:1173,white:1058},name:"Peterborough"},PH:{samples:{all:495,white:457},name:"Perth"},PL:{samples:{all:1525,white:1389},name:"Plymouth"},PO:{samples:{all:125,white:117},name:"Portsmouth"},PR:{samples:{all:3243,white:2982},name:"Preston"},RG:{samples:{all:4157,white:3730},name:"Reading"},RH:{samples:{all:774,white:692},name:"Redhill"},RM:{samples:{all:925,white:822},name:"Romford"},S:{samples:{all:21134,white:19569},name:"Sheffield"},SA:{samples:{all:3828,white:3461},name:"Swansea"},SE:{samples:{all:2144,white:1937},name:"South East London"},SG:{samples:{all:2896,white:2518},name:"Stevenage"},SK:{samples:{all:3035,white:2857},name:"Stockport"},SL:{samples:{all:1844,white:1632},name:"Slough"},SM:{samples:{all:236,white:217},name:"Sutton"},SN:{samples:{all:1196,white:1065},name:"Swindon"},SO:{samples:{all:1719,white:1537},name:"Southampton"},SP:{samples:{all:652,white:590},name:"Salisbury"},SR:{samples:{all:2608,white:2454},name:"Sunderland"},SS:{samples:{all:1455,white:1325},name:"Southend-on-Sea"},ST:{samples:{all:9005,white:8452},name:"Stoke-on-Trent"},SW:{samples:{all:197,white:186},name:"South West London"},SY:{samples:{all:0,white:0},name:"Shrewsbury"},TA:{samples:{all:822,white:752},name:"Taunton"},TD:{samples:{all:1028,white:958},name:"Galashiels"},TF:{samples:{all:741,white:684},name:"Telford"},TN:{samples:{all:629,white:566},name:"Tunbridge Wells"},TQ:{samples:{all:701,white:641},name:"Torquay"},TR:{samples:{all:3402,white:910},name:"Truro"},TS:{samples:{all:11660,white:10867},name:"Cleveland"},TW:{samples:{all:272,white:236},name:"Twickenham"},UB:{samples:{all:3385,white:2959},name:"Southall"},W:{samples:{all:498,white:433},name:"West London"},WA:{samples:{all:1520,white:1414},name:"Warrington"},WC:{samples:{all:5893,white:4753},name:"Western Central London"},WD:{samples:{all:4129,white:3487},name:"Watford"},WF:{samples:{all:6103,white:5777},name:"Wakefield"},WN:{samples:{all:5737,white:5234},name:"Wigan"},WR:{samples:{all:895,white:779},name:"Worcester"},WS:{samples:{all:5424,white:4842},name:"Walsall"},WV:{samples:{all:644,white:581},name:"Wolverhampton"},YO:{samples:{all:1768,white:1627},name:"York"},ZE:{samples:{all:45,white:44},name:"Lerwick"}},K=(a(140),a(44)),G=function(e){function t(){return Object(d.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){for(var e=this,t=[],a=0;a<this.props.data.length();++a)t.push({data:this.props.data.get_data(a),name:this.props.names[a],index:a});t.sort(function(e,t){return t.data.mean-e.data.mean});var s=t.slice(1,this.props.top_n),o=s.map(function(e,t){return{x0:t-.42,x:t+.42,y0:e.data.lower_95,y:e.data.upper_95}}),i=s.map(function(e,t){return{x:t,y:e.data.mean}});return n.a.createElement(K.d,{height:200,width:this.props.width,margin:{left:50}},n.a.createElement(K.a,{data:i,color:"blue",opacity:.5,onValueMouseOver:function(a,s){var n=t[a.x+1].index;e.props.mouseover_postcode(n)}}),n.a.createElement(K.b,{data:o,color:"blue"}),n.a.createElement(K.c,{tickValues:Object(F.a)(Array(this.props.top_n-1).keys()),tickFormat:function(e){return t[e+1].name}}),n.a.createElement(K.e,null))}}]),t}(n.a.Component),z=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).updateDimensions=function(){a.setState({height:a.div_ref.clientHeight,width:a.div_ref.clientWidth})},a.state={width:100,height:100},a}return Object(m.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions.bind(this))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateDimensions.bind(this))}},{key:"render",value:function(){var e,t,a,s=this,o={lower_95:0,mean:0,upper_95:0},i=o;if(this.props.uk_geojson&&this.props.postcode_data.has_data()){o=this.props.postcode_data.get_data(this.props.postcode_index);var l=this.props.uk_geojson.features[this.props.postcode_index];e=l.id,i=this.props.postcode_data.get_data(this.props.selected_postcode),t=this.props.postcode_names[this.props.selected_postcode],a=U[t].name;var r=Object(f.b)(l),d=Object(f.a)().center(r).rotate([4.4,0]).fitExtent([[.2*this.state.width,.2*this.state.height],[.8*this.state.width,.8*this.state.height]],l),p=Object(f.c)().projection(d);n.a.createElement("path",{key:"path"+this.props.postcode_index,d:p(l),stroke:"rgba(0,0,0,0.5)",fill:"blue",fillOpacity:"0.2",className:"postcodes"})}var c=n.a.createElement("span",{style:{color:"red"}},t),h=n.a.createElement("span",{style:{color:"green"}},e);return n.a.createElement("div",{className:"PostcodeInfo",ref:function(e){return s.div_ref=e}},n.a.createElement(S.a,{className:"PostcodeInfoCard",interactive:!1,elevation:D.a.ZERO},n.a.createElement(j.c,null,c," - ",a),n.a.createElement(j.c,null,"Top 10 postcodes"),this.props.postcode_data.has_data()&&n.a.createElement(G,{data:this.props.postcode_data,names:this.props.postcode_names,width:.9*this.state.width,top_n:10,mouseover_postcode:this.props.mouseover_postcode}),n.a.createElement(j.c,null,"Between ",c," and ",c,": [",i.lower_95.toPrecision(2),", ",i.mean.toPrecision(2),", ",i.upper_95.toPrecision(2),"]"),n.a.createElement(j.c,null,"Between ",c," and ",h,": [",o.lower_95.toPrecision(2),", ",o.mean.toPrecision(2),", ",o.upper_95.toPrecision(2),"]"),!1))}}]),t}(n.a.Component),Y=function(){function e(t){Object(d.a)(this,e),this.backend_data=null,this.index_map=t,this.thresholds=null,this.data_stride=0,this.current_threshold=0,this.upper_index=0,this.lower_weight=0,this.upper_weight=0,this.sorted_data=new Array(t.length)}return Object(p.a)(e,[{key:"set_data",value:function(e,t){this.backend_data=e,this.thresholds=t,this.data_stride=t.length}},{key:"min",value:function(){return this.has_data()?this.sorted_data[0].mean:0}},{key:"max",value:function(){return this.has_data()?this.sorted_data[this.sorted_data.length-1].mean:1}},{key:"second_max",value:function(){return this.has_data()?this.sorted_data[this.sorted_data.length-2].mean:1}},{key:"has_data",value:function(){return null!=this.backend_data}},{key:"length",value:function(){return this.index_map.length}},{key:"get_thresholds",value:function(){return this.has_data()?this.thresholds:[0,1,2]}},{key:"set_threshold",value:function(e){if(this.has_data()&&(this.upper_index=this.thresholds.findIndex(function(t){return t>e}),-1===this.upper_index&&(this.upper_index=this.thresholds.length-1),0===this.upper_index?this.lower_weight=0:this.lower_weight=(this.thresholds[this.upper_index]-e)/(this.thresholds[this.upper_index]-this.thresholds[this.upper_index-1]),this.upper_weight=1-this.lower_weight,this.has_data())){for(var t=0;t<this.index_map.length;t++)this.sorted_data[t]=this.get_data(t);this.sorted_data.sort(function(e,t){return e.mean-t.mean})}}},{key:"get_backend_index",value:function(e){return this.index_map[e]}},{key:"get_data",value:function(e){var t=this.index_map[e];if(t>=0){var a,s=3*this.data_stride*t,n=s+3*this.upper_index,o=this.backend_data.slice(n,n+3);if(this.lower_weight>0){var i=s+3*(this.upper_index-1),l=this.backend_data.slice(i,i+3);a={lower_95:o[0]*this.upper_weight+l[0]*this.lower_weight,mean:o[1]*this.upper_weight+l[1]*this.lower_weight,upper_95:o[2]*this.upper_weight+l[2]*this.lower_weight}}else a={lower_95:o[0],mean:o[1],upper_95:o[2]};return a}return NaN}}]),e}(),V=a(87),J=a(88),X=function(e){return n.a.createElement("div",{className:"LoadingScreenWrap"},n.a.createElement("div",{className:"LoadingScreen"},n.a.createElement("div",{className:"bounceball"}),n.a.createElement("div",{className:"LoadingScreenText"},"LOADING UK ANCESTRY MAP...")))};u.a.defaults.baseURL="https://fastsmc-backend.herokuapp.com";var Z=function(e){function t(e){var a,s,n;if(Object(d.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).updateDimensions=function(){a.setState({height:a.div_ref.clientHeight})},a.select_postcode_name=function(e){var t=a.state.postcode_names.findIndex(function(t){return t===e});t>-1&&(a.setState({selected_postcode_index:t}),a.get_postcode_data(a.state.display_data_index,t,a.state.display_pop_index))},a.select_postcode=function(e){a.setState({selected_postcode_index:e}),a.get_postcode_data(a.state.display_data_index,e,a.state.display_pop_index)},a.mouseover_postcode=function(e){a.setState({mouseover_postcode_index:e})},a.display_data_callback=function(e){var t=e.currentTarget.selectedIndex;a.setState({display_data_index:t}),a.get_postcode_data(t,a.state.selected_postcode_index,a.state.display_pop_index)},a.display_pop_callback=function(e){var t=e.currentTarget.selectedIndex,s=a.state.display_data_index;t!==a.state.display_pop_index&&(s=0),a.setState({display_pop_index:t,display_data_index:s}),a.get_postcode_data(s,a.state.selected_postcode_index,t)},a.display_timespan_callback=function(e){var t=e/a.state.threshold_scale[a.state.display_pop_index];a.setState(function(e){e.postcode_data.set_threshold(t);var s=a.set_color_range(e.color_range_mode,e.color_range,e.postcode_data);return{display_timespan:t,color_range:s}})},a.color_range_callback=function(e){a.setState({color_range:e})},a.set_color_range=function(e,t,a){var s=t;return 0===e?s=[a.min(),a.second_max()]:1===e&&(s=[a.sorted_data[Math.round(.05*a.sorted_data.length)].mean,a.sorted_data[Math.round(.95*a.sorted_data.length)].mean]),s},a.color_range_mode_callback=function(e){var t=e.currentTarget.selectedIndex;a.setState(function(e){var s=a.set_color_range(t,e.color_range,e.postcode_data);return{color_range_mode:t,color_range:s}})},a.state={uk_geojson:null,backend_api:null,backend_postcode_indices:null,postcode_data:null,selected_postcode_index:30,mouseover_postcode_index:30,height:100,display_data_index:0,display_data_options:null,display_pop_index:0,display_pop_options:null,display_timespan:10,color_range:[0,1],color_range_mode:1,threshold_scale:[30,1],backend_thresholds:null},a.props.location.search){var o=w.a.parse(a.props.location.search),i=function(e,t){return e?parseInt(e):t};a.state.selected_postcode_index=i(o.selected_postcode_index,a.state.selected_postcode_index),a.state.display_data_index=i(o.display_data_index,a.state.display_data_index),a.state.display_pop_index=i(o.display_pop_index,a.state.display_pop_index),a.state.display_timespan=i(o.display_timespan,a.state.display_timespan),a.state.color_range=(s=o.color_range,n=a.state.color_range,s?s.map(parseFloat):n),a.state.color_range_mode=i(o.color_range_mode,a.state.color_range_mode)}var l=Object(V.a)("uk-postcode-area.json"),r=a.get_postcode_api();return Promise.all([l,r]).then(function(e){for(var t=e[0],s=e[1].data.postcodes,n=Object.keys(s[0].data),o=[],i=0,l=n;i<l.length;i++){var r=l[i],d=Object.keys(s[0].data[r]);o.push(d)}var p=e[1].data.thresholds,c=t.objects["uk-postcode-area"].geometries.map(function(e){return e.id}),h=s.map(function(e){return e.name}),m=a.calculate_index_mapping(c,h);a.setState({uk_geojson:Object(J.a)(t,t.objects["uk-postcode-area"]),postcode_names:c,backend_api:s,display_data_options:o,display_pop_options:n,postcode_data:new Y(m,p),backend_thresholds:p})}).then(function(){a.get_postcode_data(a.state.display_data_index,a.state.selected_postcode_index,a.state.display_pop_index)}),a}return Object(m.a)(t,e),Object(p.a)(t,[{key:"calculate_index_mapping",value:function(e,t){for(var a=new Array(e.length),s=0;s<a.length;s++){for(var n=0;n<t.length&&t[n]!==e[s];)n++;n===t.length?a[s]=-1:a[s]=n}return a}},{key:"componentDidMount",value:function(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions.bind(this))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateDimensions.bind(this))}},{key:"render",value:function(){var e=this,t={selected_postcode_index:this.state.selected_postcode_index,display_data_index:this.state.display_data_index,display_pop_index:this.state.display_pop_index,display_timespan:this.state.display_timespan,color_range:this.state.color_range,color_range_mode:this.state.color_range_mode},a=[window.location.protocol,"//",window.location.host,window.location.pathname,"?",w.a.stringify(t)].join("");return this.state.uk_geojson&&this.state.postcode_data&&this.state.postcode_data.has_data()?n.a.createElement("div",{className:"App",ref:function(t){return e.div_ref=t}},n.a.createElement(v,{className:"UkMap",ref:function(t){return e.map_ref=t},height:this.state.height,uk_geojson:this.state.uk_geojson,postcode_data:this.state.postcode_data,mouseover_postcode:this.mouseover_postcode,selected_postcode:this.state.selected_postcode_index,select_postcode:this.select_postcode,highlight_postcode:this.state.mouseover_postcode_index,color_range:this.state.color_range}),n.a.createElement("div",{className:"RHS"},this.state.postcode_data&&n.a.createElement(R,{className:"UserInterface",display_data_options:this.state.display_data_options[this.state.display_pop_index],display_data_index:this.state.display_data_index,display_data_callback:this.display_data_callback,display_pop_options:this.state.display_pop_options,display_pop_index:this.state.display_pop_index,display_pop_callback:this.display_pop_callback,postcode_data:this.state.postcode_data,display_timespan:this.state.display_timespan,display_timespan_callback:this.display_timespan_callback,color_range_callback:this.color_range_callback,color_range:this.state.color_range,select_postcode:this.select_postcode_name,postcode_names:this.state.postcode_names,selected_postcode:this.state.selected_postcode_index,threshold_scale:this.state.threshold_scale[this.state.display_pop_index],parameters_string:a,color_range_mode:this.state.color_range_mode,color_range_mode_callback:this.color_range_mode_callback}),this.state.postcode_data&&n.a.createElement(z,{selected_postcode:this.state.selected_postcode_index,postcode_index:this.state.mouseover_postcode_index,uk_geojson:this.state.uk_geojson,postcode_names:this.state.postcode_names,postcode_data:this.state.postcode_data,display_data_options:this.state.display_data_options[this.state.display_pop_index],mouseover_postcode:this.mouseover_postcode}),n.a.createElement("p",null,"\xa9 Martin Robinson, Juba Nait-Saada, Pier Palamara, 2019."),n.a.createElement("div",{className:"DetailedView"}))):n.a.createElement("div",{className:"App",ref:function(t){return e.div_ref=t}},n.a.createElement(X,null))}},{key:"get_postcode_api",value:function(){return u.a.get("/fastsmc/api/postcode")}},{key:"get_postcode_data",value:function(e,t,a){var s=this,n=this.state.display_data_options[a][e],o=this.state.display_pop_options[a],i=this.state.postcode_data.get_backend_index(t),l=this.state.backend_api[i].data[o][n];u.a.get(l,{responseType:"arraybuffer",headers:{Accept:"application/octet-stream"}}).then(function(e){var t=e.data,a=new Float32Array(t).map(function(e){return e||0});s.setState(function(e){e.postcode_data.set_data(a,e.backend_thresholds[o]),e.postcode_data.set_threshold(e.display_timespan);var t=s.set_color_range(e.color_range_mode,e.color_range,e.postcode_data);return{postcode_data:e.postcode_data,color_range:t}})}).catch(function(e){console.log("Error getting postcode_data: "+e)})}}]),t}(n.a.Component),q=Object(r.e)(Z);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Q=n.a.createElement(l.a,null,n.a.createElement("div",null,n.a.createElement(r.a,{path:"/",component:q}),n.a.createElement(r.a,{path:"/:params",component:q})));i.a.render(Q,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},47:function(e,t,a){},95:function(e,t,a){e.exports=a(152)}},[[95,1,2]]]);
//# sourceMappingURL=main.fd491ec8.chunk.js.map