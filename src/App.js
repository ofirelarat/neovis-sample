import React, { useEffect } from 'react';
import NeoVis from 'neovis.js';

import './App.css';

function buildQuery(matches, where, returns) {
  return `MATCH ${matches.join(', ')}  ${where.length > 0 ? `WHERE `+ where.join(' AND '): ""} RETURN ${returns.join(', ')}`
}

function App() {
  useEffect(() => {
    var viz;
    let matches = [`(tom {name: "Tom Hanks"})`];
    let where = [];
    let returns = [`tom`];
    let query = buildQuery(matches, where,returns);
    var config = {
      container_id: "viz",
      server_url: "bolt://neo4j-tira-host.apps.ocp4.idf-cts.com:443",
      server_user: "neo4j",
      server_password: "tira",
      encrypted: "ENCRYPTION_ON",
      trust: "TRUST_ALL_CERTIFICATES",
      labels: {
          "PERSON": {
              "caption": "NAME",
              "size": 1.0,
              "community": "community",
              "title_properties": [
                  "NAME",
              ]
          }
      },
      relationships: {
          "BROTHERS": {
              "thickness": "weight",
              "caption": true
          }
      },
      arrows: true,
      initial_cypher: query
    };

    viz = new NeoVis(config);
    viz.render();

    viz.registerOnEvent("completed", (e)=>{ 
      viz["_network"].on("click", (event)=>{ 
        if(event.nodes[0] !== undefined) {
          const id = matches.length;
          matches.push(`p${id} = (n${id})-[*1..1]-()`);
          where.push(`ID(n${id})=${event.nodes[0]}`);
          returns.push(`p${id}`)
          
          console.log(buildQuery(matches, where,returns))


          viz.renderWithCypher(buildQuery(matches, where,returns));
        }
      });
  });

  },[]);

  return (
    <div className="App">
        <div id="viz"></div>
    </div>
  );
}

export default App;
