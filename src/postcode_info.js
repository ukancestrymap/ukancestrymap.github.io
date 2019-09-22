
const postcode_info = {
  "AB": {'samples': {'all': 1542 , 'white': 1433   }, 'name': "Aberdeen"                   },
  "AL": {'samples': {'all': 2455 , 'white': 1918   }, 'name': "St Albans"	                },
  "B" : {'samples': {'all': 17345, 'white': 14597  }, 'name': "Birmingham"                 },
  "BA": {'samples': {'all': 763  , 'white': 709    }, 'name': "Bath"                       },
  "BB": {'samples': {'all': 3689 , 'white': 3458   }, 'name': "Blackburn"                   },
  "BD": {'samples': {'all': 190  , 'white': 177    }, 'name': "Bradford"                   },
  "BH": {'samples': {'all': 935  , 'white': 818    }, 'name': "Bournemouth"                 },
  "BL": {'samples': {'all': 11395, 'white': 10368  }, 'name': "Bolton"                     },
  "BN": {'samples': {'all': 0    , 'white': 0      }, 'name': "Brighton"                   },
  "BR": {'samples': {'all': 565  , 'white': 510    }, 'name': "Bromley"                     },
  "BS": {'samples': {'all': 16508, 'white': 15119  }, 'name': "Bristol"                     },
  "BT": {'samples': {'all': 974  , 'white': 884    }, 'name': "Belfast"                     },
  "CA": {'samples': {'all': 1618 , 'white': 1508   }, 'name': "Carlisle"                   },
  "CB": {'samples': {'all': 1310 , 'white': 1121   }, 'name': "Cambridge"                   },
  "CF": {'samples': {'all': 8696 , 'white': 7782   }, 'name': "Cardiff"                     },
  "CH": {'samples': {'all': 2490 , 'white': 2246   }, 'name': "Chester"                     },
  "CM": {'samples': {'all': 1344 , 'white': 1184   }, 'name': "Chelmsford"                 },
  "CO": {'samples': {'all': 715  , 'white': 626    }, 'name': "Colchester"                 },
  "CR": {'samples': {'all': 0    , 'white': 0      }, 'name': "Croydon"                     },
  "CT": {'samples': {'all': 1072 , 'white': 970    }, 'name': "Canterbury"                 },
  "CV": {'samples': {'all': 2720 , 'white': 2374   }, 'name': "Coventry"                   },
  "CW": {'samples': {'all': 311  , 'white': 293    }, 'name': "Crewe"                       },
  "DA": {'samples': {'all': 1485 , 'white': 1314   }, 'name': "Dartford"                   },
  "DD": {'samples': {'all': 1418 , 'white': 1280   }, 'name': "Dundee"                     },
  "DE": {'samples': {'all': 6504 , 'white': 6064   }, 'name': "Derby"                       },
  "DG": {'samples': {'all': 635  , 'white': 571    }, 'name': "Dumfries"                   },
  "DH": {'samples': {'all': 11851, 'white': 11119  }, 'name': "Durham"                     },
  "DL": {'samples': {'all': 2985 , 'white': 2784   }, 'name': "Darlington"                 },
  "DN": {'samples': {'all': 1172 , 'white': 1086   }, 'name': "Doncaster"                   },
  "DT": {'samples': {'all': 326  , 'white': 305    }, 'name': "Dorchester"                 },
  "DY": {'samples': {'all': 571  , 'white': 514    }, 'name': "Dudley"                     },
  "E" : {'samples': {'all': 70   , 'white': 61     }, 'name': "East London"                 },
  "EC": {'samples': {'all': 10884, 'white': 7838   }, 'name': "East Central London"         },
  "EH": {'samples': {'all': 419  , 'white': 367    }, 'name': "Edinburgh"                   },
  "EN": {'samples': {'all': 6643 , 'white': 5644   }, 'name': "Enfield"                     },
  "EX": {'samples': {'all': 1132 , 'white': 1019   }, 'name': "Exeter"                     },
  "FK": {'samples': {'all': 1719 , 'white': 1496   }, 'name': "Falkirk"                     },
  "FY": {'samples': {'all': 1860 , 'white': 1683   }, 'name': "Blackpool"                  },
  "G" : {'samples': {'all': 15625, 'white': 12970  }, 'name': "Glasgow"                     },
  "GL": {'samples': {'all': 2528 , 'white': 2312   }, 'name': "Gloucester"                 },
  "GU": {'samples': {'all': 1363 , 'white': 1190   }, 'name': "Guildford"                   },
  "HA": {'samples': {'all': 3854 , 'white': 3078   }, 'name': "Harrow"                     },
  "HD": {'samples': {'all': 1938 , 'white': 1775   }, 'name': "Huddersfield"               },
  "HG": {'samples': {'all': 2510 , 'white': 2345   }, 'name': "Harrogate"                   },
  "HP": {'samples': {'all': 2138 , 'white': 1899   }, 'name': "Hemel Hempstead"             },
  "HR": {'samples': {'all': 685  , 'white': 638    }, 'name': "Hereford"                   },
  "HS": {'samples': {'all': 210  , 'white': 197    }, 'name': "Outer Hebrides"             },
  "HU": {'samples': {'all': 2484 , 'white': 2302   }, 'name': "Hull"                       },
  "HX": {'samples': {'all': 3998 , 'white': 3657   }, 'name': "Halifax"                     },
  "IG": {'samples': {'all': 4208 , 'white': 3598   }, 'name': "Ilford"                     },
  "IP": {'samples': {'all': 955  , 'white': 838    }, 'name': "Ipswich"                     },
  "IV": {'samples': {'all': 788  , 'white': 727    }, 'name': "Inverness"                   },
  "KA": {'samples': {'all': 1206 , 'white': 1093   }, 'name': "Kilmarnock"                 },
  "KT": {'samples': {'all': 2627 , 'white': 2273   }, 'name': "Kingston upon Thames"        },
  "KW": {'samples': {'all': 173  , 'white': 162    }, 'name': "Kirkwall"                   },
  "KY": {'samples': {'all': 10546, 'white': 9467   }, 'name': "Kirkcaldy"                   },
  "L" : {'samples': {'all': 24114, 'white': 21395  }, 'name': "Liverpool"                   },
  "LA": {'samples': {'all': 1656 , 'white': 1535   }, 'name': "Lancaster"                   },
  "LD": {'samples': {'all': 141  , 'white': 129    }, 'name': "Llandrindod Wells"          },
  "LE": {'samples': {'all': 3524 , 'white': 3205   }, 'name': "Leicester"                   },
  "LL": {'samples': {'all': 718  , 'white': 656    }, 'name': "Llandudno"                   },
  "LN": {'samples': {'all': 1448 , 'white': 1339   }, 'name': "Lincoln"                     },
  "LS": {'samples': {'all': 21759, 'white': 19455  }, 'name': "Leeds"                       },
  "LU": {'samples': {'all': 1374 , 'white': 1211   }, 'name': "Luton"                       },
  "M" : {'samples': {'all': 1917 , 'white': 1784   }, 'name': "Manchester"                 },
  "ME": {'samples': {'all': 899  , 'white': 799    }, 'name': "Rochester"                  },
  "MK": {'samples': {'all': 1342 , 'white': 1153   }, 'name': "Milton Keynes"               },
  "ML": {'samples': {'all': 3024 , 'white': 2501   }, 'name': "Motherwell"                 },
  "N" : {'samples': {'all': 521  , 'white': 446    }, 'name': "North London"               },
  "NE": {'samples': {'all': 21305, 'white': 19959  }, 'name': "Newcastle upon Tyne"         },
  "NG": {'samples': {'all': 14987, 'white': 13710  }, 'name': "Nottingham"                 },
  "NN": {'samples': {'all': 1901 , 'white': 1691   }, 'name': "Northampton"                 },
  "NP": {'samples': {'all': 3538 , 'white': 3230   }, 'name': "Newport"                     },
 "NPT": {'samples': {'all': 4509 , 'white': 4194   }, 'name': "Newport"                     },
  "NR": {'samples': {'all': 1308 , 'white': 1196   }, 'name': "Norwich"                     },
  "NW": {'samples': {'all': 5869 , 'white': 3969   }, 'name': "North West London"          },
  "OL": {'samples': {'all': 18852, 'white': 16548  }, 'name': "Oldham"                     },
  "OX": {'samples': {'all': 5206 , 'white': 4731   }, 'name': "Oxford"                      },
  "PA": {'samples': {'all': 1114 , 'white': 979    }, 'name': "Paisley"                    },
  "PE": {'samples': {'all': 1173 , 'white': 1058   }, 'name': "Peterborough"                },
  "PH": {'samples': {'all': 495  , 'white': 457    }, 'name': "Perth"                      },
  "PL": {'samples': {'all': 1525 , 'white': 1389   }, 'name': "Plymouth"                   },
  "PO": {'samples': {'all': 125  , 'white': 117    }, 'name': "Portsmouth"                  },
  "PR": {'samples': {'all': 3243 , 'white': 2982   }, 'name': "Preston"                     },
  "RG": {'samples': {'all': 4157 , 'white': 3730   }, 'name': "Reading"                     },
  "RH": {'samples': {'all': 774  , 'white': 692    }, 'name': "Redhill"                     },
  "RM": {'samples': {'all': 925  , 'white': 822    }, 'name': "Romford"                     },
  "S" : {'samples': {'all': 21134, 'white': 19569  }, 'name': "Sheffield"                   },
  "SA": {'samples': {'all': 3828 , 'white': 3461   }, 'name': "Swansea"                     },
  "SE": {'samples': {'all': 2144 , 'white': 1937   }, 'name': "South East London"           },
  "SG": {'samples': {'all': 2896 , 'white': 2518   }, 'name': "Stevenage"                   },
  "SK": {'samples': {'all': 3035 , 'white': 2857   }, 'name': "Stockport"                  },
  "SL": {'samples': {'all': 1844 , 'white': 1632   }, 'name': "Slough"                     },
  "SM": {'samples': {'all': 236  , 'white': 217    }, 'name': "Sutton"                      },
  "SN": {'samples': {'all': 1196 , 'white': 1065   }, 'name': "Swindon"                     },
  "SO": {'samples': {'all': 1719 , 'white': 1537   }, 'name': "Southampton"                },
  "SP": {'samples': {'all': 652  , 'white': 590    }, 'name': "Salisbury"                  },
  "SR": {'samples': {'all': 2608 , 'white': 2454   }, 'name': "Sunderland"                  },
  "SS": {'samples': {'all': 1455 , 'white': 1325   }, 'name': "Southend-on-Sea"            },
  "ST": {'samples': {'all': 9005 , 'white': 8452   }, 'name': "Stoke-on-Trent"              },
  "SW": {'samples': {'all': 197  , 'white': 186    }, 'name': "South West London"          },
  "SY": {'samples': {'all': 0    , 'white': 0      }, 'name': "Shrewsbury"                  },
  "TA": {'samples': {'all': 822  , 'white': 752    }, 'name': "Taunton"                    },
  "TD": {'samples': {'all': 1028 , 'white': 958    }, 'name': "Galashiels"                  },
  "TF": {'samples': {'all': 741  , 'white': 684    }, 'name': "Telford"                     },
  "TN": {'samples': {'all': 629  , 'white': 566    }, 'name': "Tunbridge Wells"             },
  "TQ": {'samples': {'all': 701  , 'white': 641    }, 'name': "Torquay"                     },
  "TR": {'samples': {'all': 3402 , 'white': 910    }, 'name': "Truro"                      },
  "TS": {'samples': {'all': 11660, 'white': 10867  }, 'name': "Cleveland"                  },
  "TW": {'samples': {'all': 272  , 'white': 236    }, 'name': "Twickenham"                   },
  "UB": {'samples': {'all': 3385 , 'white': 2959   }, 'name': "Southall"                    },
  "W" : {'samples': {'all': 498  , 'white': 433    }, 'name': "West London"                },
  "WA": {'samples': {'all': 1520 , 'white': 1414   }, 'name': "Warrington"                  },
  "WC": {'samples': {'all': 5893 , 'white': 4753   }, 'name': "Western Central London"      },
  "WD": {'samples': {'all': 4129 , 'white': 3487   }, 'name': "Watford"                     },
  "WF": {'samples': {'all': 6103 , 'white': 5777   }, 'name': "Wakefield"                   },
  "WN": {'samples': {'all': 5737 , 'white': 5234   }, 'name': "Wigan"                       },
  "WR": {'samples': {'all': 895  , 'white': 779    }, 'name': "Worcester"                   },
  "WS": {'samples': {'all': 5424 , 'white': 4842   }, 'name': "Walsall"                     },
  "WV": {'samples': {'all': 644  , 'white': 581    }, 'name': "Wolverhampton"              },
  "YO": {'samples': {'all': 1768 , 'white': 1627   }, 'name': "York"                       },
  "ZE": {'samples': {'all': 45   , 'white': 44     }, 'name': "Lerwick"                        },
  }
  
export default postcode_info

