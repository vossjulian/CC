class Agent {
    constructor
    (
      x = 0,
      y = 0  
    ) 
    {
        this.pos = createVector(x, y);
        this.velocity = createVector(random(-1,1), random(-1,1));
        this.acceleration = createVector(0, 0);
        this.sightRange = 30;
        this.speed = 2;
        this.color = color(random(0, 255), random(0, 255), random(0, 255));
    }

    render(agents, factorAlignment, factorCohesion, factorSeparation, factorSpeed) {
        fill(color(this.color));
        noStroke();

        // Berechnung der Verhaltensregeln
        let alignment = this.calculateAlignment(agents);
        let cohesion = this.calculateCohesion(agents);
        let separation = this.calculateSeparation(agents);

        // Aufaddieren der Berechnungen
        this.acceleration.add(alignment.mult(factorAlignment));
        this.acceleration.add(cohesion.mult(factorCohesion));
        this.acceleration.add(separation.mult(factorSeparation));
    
        // Bewegungsrichtung setzen und Tempo limitieren
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.speed * factorSpeed);

        // Grenzen überprüfen
        this.checkBounds();

        // Agent in berechnete Richtung bewegen
        this.pos.add(this.velocity);

        // Platzhalter für Berechnungen für nächsten render-Call wieder auf 0 setzen
        this.acceleration.mult(0); 

        // Agent zeichnen
        circle(this.pos.x, this.pos.y, 25);
    }

    update() {
        this.x += random(-this.speed, this.speed);
        this.x = constrain(this.x, 0, width);
        this.y += random(-this.speed, this.speed);
        this.y = constrain(this.y, 0, height);
    }

    // Ausrichtung des Agents berechnen
    calculateAlignment(agents) { 
        let alignmentVec = createVector(0, 0);
        let count = 0;
        
        // Die Liste aller Agenten durchgehen
        agents.forEach(agent => {
            // Distanz zum nächsten Agent berechnen
            let delta = this.pos.dist(agent.pos);
            // Prüfen ob in Sichtweite 
            if((delta > 0) && (delta < this.sightRange)) {
                // Anpassung an Bewegung des Nachbar-Agent
                alignmentVec.x += agent.velocity.x;
                alignmentVec.y += agent.velocity.y;
                // Anzahl gefundener Nachbarn erhöhen
                count++
            }
        });

        if(count == 0) {
            return alignmentVec;
        }
        else {
            // Durch Anzahl gefundener Nachbarn teilen, um Mittelwert zu erhalten
            alignmentVec.div(count)
            // Normalisieren um einen Vektor mit Länge 1 zu bekommen, der die Bewegungsrichtung angibt
            alignmentVec.normalize();
    
            return alignmentVec;
        }

    }

    // Berechnung des Zusammenhalts der Agents, ähnlich zu Alignment
    calculateCohesion(agents) {
        let cohesionVec = createVector(0, 0);
        let count = 0;

        agents.forEach(agent => {
            let delta = this.pos.dist(agent.pos);
            if((delta > 0) && (delta < this.sightRange)) {
                // Anpassung an Position des Nachbaragents
                cohesionVec.x += agent.pos.x;
                cohesionVec.y += agent.pos.y;
                count++
            }
        });

        if(count == 0) {
            return cohesionVec;
        }
        else {
            // Mittelpunkt der gefundenen Nachbar-Agents berechnen (lokale Gruppe)
            cohesionVec.div(count);
            // Richtung zum Mittelpunkt der lokalen Gruppe
            cohesionVec = createVector(cohesionVec.x - this.pos.x, cohesionVec.y - this.pos.y);
            cohesionVec.normalize();
    
            return cohesionVec;   
        }
    }

    // Berechnung des Abstandes, ähnlich zu Alignment und Cohesion
    calculateSeparation(agents) {
        let separationVec = createVector(0, 0);
        let count = 0;

        agents.forEach(agent => {
            let delta = this.pos.dist(agent.pos);
            if((delta > 0) && (delta < 25)) {
                // Anpassung in die Entgegengesetzte Richtung der Nachbar-Agents
                separationVec.x += this.pos.x - agent.pos.x;
                separationVec.y += this.pos.y - agent.pos.y;
                count++;
            }
        });

        if(count == 0) {
            return separationVec;
        }
        else {
            // Richtung des mittleren Abstands zu allen gefundenen Nachbarn berechnen
            separationVec.div(count);
            separationVec.normalize();
            return separationVec;
        }
    }

    // Bereich der Agents eingrenzen, beim Erreichen der Grenze -> Positon auf Entgegengesetze Richtung setzen
    checkBounds() {
        if (this.pos.x < 0)  this.pos.x = width;
        if (this.pos.y < 0)  this.pos.y = height;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y > height) this.pos.y = 0;
    }
}