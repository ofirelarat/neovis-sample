import React, { useEffect } from 'react';
import NeoVis from './neovis/neovis';

import './App.css';

function App() {
  useEffect(() => {
    var viz;
    let query = 'MATCH (tom {name: "Tom Hanks"}) RETURN tom';
    var config = {
      container_id: "viz",
      server_url: "bolt://neo4j-tira-host.apps.ocp4.idf-cts.com:443",
      server_user: "neo4j",
      server_password: "balash123",
      encrypted: "ENCRYPTION_ON",
      trust: "TRUST_ALL_CERTIFICATES",
      labels: {
          "Person": {
              "caption": "name",
          },
          "Movie": {
            "caption": "title"
          }
      },
      relationships: {
          "ACTED_IN": {
              "thickness": "weight",
              "caption": true
          },
          "DIRECTED": {
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
          query =`
          MATCH p = (n)-[*1..1]-() WHERE ID(n)=${event.nodes[0]}
          RETURN p`;

          viz.updateWithCypher(query);
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
