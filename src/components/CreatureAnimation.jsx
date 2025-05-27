import React, { useEffect, useRef } from 'react';

const CreatureAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const Input = {
      keys: [],
      mouse: {
        left: false,
        right: false,
        middle: false,
        x: 0,
        y: 0,
      },
    };
    
    // Initialize keys array
    for (let i = 0; i < 230; i++) {
      Input.keys.push(false);
    }
    
    // Event listeners
    const handleKeyDown = (event) => {
      Input.keys[event.keyCode] = true;
    };
    
    const handleKeyUp = (event) => {
      Input.keys[event.keyCode] = false;
    };
    
    const handleMouseDown = (event) => {
      if ((event.button === 0)) {
        Input.mouse.left = true;
      }
      if ((event.button === 1)) {
        Input.mouse.middle = true;
      }
      if ((event.button === 2)) {
        Input.mouse.right = true;
      }
    };
    
    const handleMouseUp = (event) => {
      if ((event.button === 0)) {
        Input.mouse.left = false;
      }
      if ((event.button === 1)) {
        Input.mouse.middle = false;
      }
      if ((event.button === 2)) {
        Input.mouse.right = false;
      }
    };
    
    const handleMouseMove = (event) => {
      Input.mouse.x = event.clientX;
      Input.mouse.y = event.clientY;
    };
    
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    
    // Set up canvas
    const canvas = canvasRef.current;
    
    // Set initial dimensions
    const updateCanvasDimensions = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    updateCanvasDimensions();
    const ctx = canvas.getContext("2d");
    // Necessary classes
    let segmentCount = 0;
    
    class Segment {
      constructor(parent, size, angle, range, stiffness) {
        segmentCount++;
        this.isSegment = true;
        this.parent = parent; // Segment which this one is connected to
        if (typeof parent.children === "object") {
          parent.children.push(this);
        }
        this.children = []; // Segments connected to this segment
        this.size = size; // Distance from parent
        this.relAngle = angle; // Angle relative to parent
        this.defAngle = angle; // Default angle relative to parent
        this.absAngle = parent.absAngle + angle; // Angle relative to x-axis
        this.range = range; // Difference between maximum and minimum angles
        this.stiffness = stiffness; // How closely it conforms to default angle
        this.updateRelative(false, true);
      }
      updateRelative(iter, flex) {
        this.relAngle =
          this.relAngle -
          2 *
            Math.PI *
            Math.floor((this.relAngle - this.defAngle) / 2 / Math.PI + 1 / 2);
        if (flex) {
          //		this.relAngle=this.range/
          //				(1+Math.exp(-4*(this.relAngle-this.defAngle)/
          //				(this.stiffness*this.range)))
          //			  -this.range/2+this.defAngle;
          this.relAngle = Math.min(
            this.defAngle + this.range / 2,
            Math.max(
              this.defAngle - this.range / 2,
              (this.relAngle - this.defAngle) / this.stiffness + this.defAngle
            )
          );
        }
        this.absAngle = this.parent.absAngle + this.relAngle;
        this.x = this.parent.x + Math.cos(this.absAngle) * this.size; // Position
        this.y = this.parent.y + Math.sin(this.absAngle) * this.size; // Position
        if (iter) {
          for (let i = 0; i < this.children.length; i++) {
            this.children[i].updateRelative(iter, flex);
          }
        }
      }
      draw(iter) {
        ctx.beginPath();
        ctx.moveTo(this.parent.x, this.parent.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        if (iter) {
          for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(true);
          }
        }
      }
      follow(iter) {
        const x = this.parent.x;
        const y = this.parent.y;
        const dist = ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
        this.x = x + (this.size * (this.x - x)) / dist;
        this.y = y + (this.size * (this.y - y)) / dist;
        this.absAngle = Math.atan2(this.y - y, this.x - x);
        this.relAngle = this.absAngle - this.parent.absAngle;
        this.updateRelative(false, true);
        //this.draw();
        if (iter) {
          for (let i = 0; i < this.children.length; i++) {
            this.children[i].follow(true);
          }
        }
      }
    }
    class LimbSystem {
      constructor(end, length, speed, creature) {
        this.end = end;
        this.length = Math.max(1, length);
        this.creature = creature;
        this.speed = speed;
        creature.systems.push(this);
        this.nodes = [];
        let node = end;
        for (let i = 0; i < length; i++) {
          this.nodes.unshift(node);
          //node.stiffness=1;
          node = node.parent;
          if (!node.isSegment) {
            this.length = i + 1;
            break;
          }
        }
        this.hip = this.nodes[0].parent;
      }
      moveTo(x, y) {
        this.nodes[0].updateRelative(true, true);
        const dist = ((x - this.end.x) ** 2 + (y - this.end.y) ** 2) ** 0.5;
        let len = Math.max(0, dist - this.speed);
        for (let i = this.nodes.length - 1; i >= 0; i--) {
          const node = this.nodes[i];
          const ang = Math.atan2(node.y - y, node.x - x);
          node.x = x + len * Math.cos(ang);
          node.y = y + len * Math.sin(ang);
          x = node.x;
          y = node.y;
          len = node.size;
        }
        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          node.absAngle = Math.atan2(
            node.y - node.parent.y,
            node.x - node.parent.x
          );
          node.relAngle = node.absAngle - node.parent.absAngle;
          for (let ii = 0; ii < node.children.length; ii++) {
            const childNode = node.children[ii];
            if (!this.nodes.includes(childNode)) {
              childNode.updateRelative(true, false);
            }
          }
        }
        //this.nodes[0].updateRelative(true,false)
      }
      update() {
        this.moveTo(Input.mouse.x, Input.mouse.y);
      }
    }
    class LegSystem extends LimbSystem {
      constructor(end, length, speed, creature) {
        super(end, length, speed, creature);
        this.goalX = end.x;
        this.goalY = end.y;
        this.step = 0; // 0 stand still, 1 move forward, 2 move towards foothold
        this.forwardness = 0;

        // For foot goal placement
        this.reach =
          0.9 *
          ((this.end.x - this.hip.x) ** 2 + (this.end.y - this.hip.y) ** 2) ** 0.5;
        let relAngle =
          this.creature.absAngle -
          Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x);
        relAngle -= 2 * Math.PI * Math.floor(relAngle / 2 / Math.PI + 1 / 2);
        this.swing = -relAngle + ((2 * (relAngle < 0) - 1) * Math.PI) / 2;
        this.swingOffset = this.creature.absAngle - this.hip.absAngle;
        // this.swing*=(2*(relAngle>0)-1);
      }
      update(x, y) {
        this.moveTo(this.goalX, this.goalY);
        // this.nodes[0].follow(true,true)
        if (this.step === 0) {
          const dist =
            ((this.end.x - this.goalX) ** 2 + (this.end.y - this.goalY) ** 2) **
            0.5;
          if (dist > 1) {
            this.step = 1;
            // this.goalX=x;
            // this.goalY=y;
            this.goalX =
              this.hip.x +
              this.reach *
                Math.cos(this.swing + this.hip.absAngle + this.swingOffset) +
              ((2 * Math.random() - 1) * this.reach) / 2;
            this.goalY =
              this.hip.y +
              this.reach *
                Math.sin(this.swing + this.hip.absAngle + this.swingOffset) +
              ((2 * Math.random() - 1) * this.reach) / 2;
          }
        } else if (this.step === 1) {
          const theta =
            Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x) -
            this.hip.absAngle;
          const dist =
            ((this.end.x - this.hip.x) ** 2 + (this.end.y - this.hip.y) ** 2) **
            0.5;
          const forwardness2 = dist * Math.cos(theta);
          const dF = this.forwardness - forwardness2;
          this.forwardness = forwardness2;
          if (dF * dF < 1) {
            this.step = 0;
            this.goalX = this.hip.x + (this.end.x - this.hip.x);
            this.goalY = this.hip.y + (this.end.y - this.hip.y);
          }
        }
        // ctx.strokeStyle='blue';
        // ctx.beginPath();
        // ctx.moveTo(this.end.x,this.end.y);
        // ctx.lineTo(this.hip.x+this.reach*Math.cos(this.swing+this.hip.absAngle+this.swingOffset),
        //           this.hip.y+this.reach*Math.sin(this.swing+this.hip.absAngle+this.swingOffset));
        // ctx.stroke();
        // ctx.strokeStyle='black';
      }
    }
    class Creature {
      constructor(
        x,
        y,
        angle,
        fAccel,
        fFric,
        fRes,
        fThresh,
        rAccel,
        rFric,
        rRes,
        rThresh
      ) {
        this.x = x; // Starting position
        this.y = y;
        this.absAngle = angle; // Starting angle
        this.fSpeed = 0; // Forward speed
        this.fAccel = fAccel; // Force when moving forward
        this.fFric = fFric; // Friction against forward motion
        this.fRes = fRes; // Resistance to motion
        this.fThresh = fThresh; // minimum distance to target to keep moving forward
        this.rSpeed = 0; // Rotational speed
        this.rAccel = rAccel; // Force when rotating
        this.rFric = rFric; // Friction against rotation
        this.rRes = rRes; // Resistance to rotation
        this.rThresh = rThresh; // Maximum angle difference before rotation
        this.children = [];
        this.systems = [];
      }
      follow(x, y) {
        const dist = ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
        const angle = Math.atan2(y - this.y, x - this.x);
        // Update forward
        let accel = this.fAccel;
        if (this.systems.length > 0) {
          let sum = 0;
          for (let i = 0; i < this.systems.length; i++) {
            sum += this.systems[i].step === 0;
          }
          accel *= sum / this.systems.length;
        }
        this.fSpeed += accel * (dist > this.fThresh);
        this.fSpeed *= 1 - this.fRes;
        this.speed = Math.max(0, this.fSpeed - this.fFric);
        // Update rotation
        let dif = this.absAngle - angle;
        dif -= 2 * Math.PI * Math.floor(dif / (2 * Math.PI) + 1 / 2);
        if (Math.abs(dif) > this.rThresh && dist > this.fThresh) {
          this.rSpeed -= this.rAccel * (2 * (dif > 0) - 1);
        }
        this.rSpeed *= 1 - this.rRes;
        if (Math.abs(this.rSpeed) > this.rFric) {
          this.rSpeed -= this.rFric * (2 * (this.rSpeed > 0) - 1);
        } else {
          this.rSpeed = 0;
        }

        // Update position
        this.absAngle += this.rSpeed;
        this.absAngle -=
          2 * Math.PI * Math.floor(this.absAngle / (2 * Math.PI) + 1 / 2);
        this.x += this.speed * Math.cos(this.absAngle);
        this.y += this.speed * Math.sin(this.absAngle);
        this.absAngle += Math.PI;
        for (let i = 0; i < this.children.length; i++) {
          this.children[i].follow(true, true);
        }
        for (let i = 0; i < this.systems.length; i++) {
          this.systems[i].update(x, y);
        }
        this.absAngle -= Math.PI;
        this.draw(true);
      }
      draw(iter) {
        const r = 4;
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          r,
          Math.PI / 4 + this.absAngle,
          (7 * Math.PI) / 4 + this.absAngle
        );
        ctx.moveTo(
          this.x + r * Math.cos((7 * Math.PI) / 4 + this.absAngle),
          this.y + r * Math.sin((7 * Math.PI) / 4 + this.absAngle)
        );
        ctx.lineTo(
          this.x + r * Math.cos(this.absAngle) * 2 ** 0.5,
          this.y + r * Math.sin(this.absAngle) * 2 ** 0.5
        );
        ctx.lineTo(
          this.x + r * Math.cos(Math.PI / 4 + this.absAngle),
          this.y + r * Math.sin(Math.PI / 4 + this.absAngle)
        );
        ctx.stroke();
        if (iter) {
          for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(true);
          }
        }
      }
    }
    // Initialize and animate functions
    const setupSimple = () => {
      // (x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
      const critter = new Creature(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        12,
        1,
        0.5,
        16,
        0.5,
        0.085,
        0.5,
        0.3
      );
      let node = critter;
      // (parent,size,angle,range,stiffness)
      for (let i = 0; i < 128; i++) {
        node = new Segment(node, 8, 0, 3.14159 / 2, 1);
      }
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        critter.follow(Input.mouse.x, Input.mouse.y);
      }, 33);
    };

    const setupTentacle = () => {
      // (x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
      const critter = new Creature(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        12,
        1,
        0.5,
        16,
        0.5,
        0.085,
        0.5,
        0.3
      );
      let node = critter;
      // (parent,size,angle,range,stiffness)
      for (let i = 0; i < 32; i++) {
        node = new Segment(node, 8, 0, 2, 1);
      }
      // (end,length,speed,creature)
      const tentacle = new LimbSystem(node, 32, 8, critter);
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        critter.follow(canvas.width / 2, canvas.height / 2);
        ctx.beginPath();
        ctx.arc(Input.mouse.x, Input.mouse.y, 2, 0, 6.283);
        ctx.fill();
      }, 33);
    };

    const setupArm = () => {
      // (x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
      const critter = new Creature(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        12,
        1,
        0.5,
        16,
        0.5,
        0.085,
        0.5,
        0.3
      );
      let node = critter;
      // (parent,size,angle,range,stiffness)
      for (let i = 0; i < 3; i++) {
        node = new Segment(node, 80, 0, 3.1416, 1);
      }
      const tentacle = new LimbSystem(node, 3, critter);
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        critter.follow(canvas.width / 2, canvas.height / 2);
      }, 33);
      ctx.beginPath();
      ctx.arc(Input.mouse.x, Input.mouse.y, 2, 0, 6.283);
      ctx.fill();
    };

    const setupTestSquid = (size, legs) => {
      // (x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
      const critter = new Creature(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        size * 10,
        size * 3,
        0.5,
        16,
        0.5,
        0.085,
        0.5,
        0.3
      );
      const legNum = legs;
      const jointNum = 32;
      for (let i = 0; i < legNum; i++) {
        let node = critter;
        const ang = (Math.PI / 2) * (i / (legNum - 1) - 0.5);
        for (let ii = 0; ii < jointNum; ii++) {
          node = new Segment(
            node,
            (size * 64) / jointNum,
            ang * (ii === 0),
            3.1416,
            1.2
          );
        }
        // (end,length,speed,creature,dist)
        const leg = new LegSystem(node, jointNum, size * 30, critter);
      }
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        critter.follow(Input.mouse.x, Input.mouse.y);
      }, 33);
    };

    const setupLizard = (size, legs, tail) => {
      const s = size;
      // (x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
      const critter = new Creature(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        s * 10,
        s * 2,
        0.5,
        16,
        0.5,
        0.085,
        0.5,
        0.3
      );
      let spinal = critter;
      // (parent,size,angle,range,stiffness)
      // Neck
      for (let i = 0; i < 6; i++) {
        spinal = new Segment(spinal, s * 4, 0, (3.1415 * 2) / 3, 1.1);
        for (let ii = -1; ii <= 1; ii += 2) {
          let node = new Segment(spinal, s * 3, ii, 0.1, 2);
          for (let iii = 0; iii < 3; iii++) {
            node = new Segment(node, s * 0.1, -ii * 0.1, 0.1, 2);
          }
        }
      }
      // Torso and legs
      for (let i = 0; i < legs; i++) {
        if (i > 0) {
          // Vertebrae and ribs
          for (let ii = 0; ii < 6; ii++) {
            spinal = new Segment(spinal, s * 4, 0, 1.571, 1.5);
            for (let iii = -1; iii <= 1; iii += 2) {
              let node = new Segment(spinal, s * 3, iii * 1.571, 0.1, 1.5);
              for (let iv = 0; iv < 3; iv++) {
                node = new Segment(node, s * 3, -iii * 0.3, 0.1, 2);
              }
            }
          }
        }
        // Legs and shoulders
        for (let ii = -1; ii <= 1; ii += 2) {
          let node = new Segment(spinal, s * 12, ii * 0.785, 0, 8); // Hip
          node = new Segment(node, s * 16, -ii * 0.785, 6.28, 1); // Humerus
          node = new Segment(node, s * 16, ii * 1.571, 3.1415, 2); // Forearm
          for (
            let iii = 0;
            iii < 4;
            iii++ // fingers
          ) {
            new Segment(node, s * 4, (iii / 3 - 0.5) * 1.571, 0.1, 4);
          }
          new LegSystem(node, 3, s * 12, critter, 4);
        }
      }
      // Tail
      for (let i = 0; i < tail; i++) {
        spinal = new Segment(spinal, s * 4, 0, (3.1415 * 2) / 3, 1.1);
        for (let ii = -1; ii <= 1; ii += 2) {
          let node = new Segment(spinal, s * 3, ii, 0.1, 2);
          for (let iii = 0; iii < 3; iii++) {
            node = new Segment(
              node,
              (s * 3 * (tail - i)) / tail,
              -ii * 0.1,
              0.1,
              2
            );
          }
        }
      }
      
      // Return the animation interval ID so we can clean it up later
      return setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        critter.follow(Input.mouse.x, Input.mouse.y);
      }, 33);
    };

    // Set up the animation
    canvas.style.backgroundColor = "black";
    ctx.strokeStyle = "white";
    
    // Choose which animation to run
    // setupSimple(); // Just the very basic string
    // setupTentacle(); // Tentacle that reaches for mouse
    // setupLizard(.5,100,128); // Literal centipede
    // setupTestSquid(2,8); // Spidery thing
    
    // Handle window resize to keep canvas responsive
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        updateCanvasDimensions();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Calculate creature position based on container center
    const containerWidth = canvas.width;
    const containerHeight = canvas.height;
    
    // Adjust mouse coordinates relative to canvas
    const getRelativeMouseCoords = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };
    
    // Update mouse move handler to use relative coordinates
    document.removeEventListener("mousemove", handleMouseMove);
    const handleRelativeMouseMove = (event) => {
      const coords = getRelativeMouseCoords(event);
      Input.mouse.x = coords.x;
      Input.mouse.y = coords.y;
    };
    document.addEventListener("mousemove", handleRelativeMouseMove);
    
    const legNum = Math.floor(1 + Math.random() * 6); // Reduced complexity
    const animationInterval = setupLizard(
      8 / Math.sqrt(legNum),
      legNum,
      Math.floor(4 + Math.random() * legNum * 4)
    );
    
    // Clean up function to remove event listeners and stop animation when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleRelativeMouseMove);
      window.removeEventListener('resize', handleResize);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="creature-animation-container" style={{ 
      width: '100%',
      height: '500px',
      backgroundColor: 'black',
      marginBottom: '2rem',
      borderRadius: '8px'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: 'black'
        }}
      />
    </div>
  );
};

export default CreatureAnimation;
