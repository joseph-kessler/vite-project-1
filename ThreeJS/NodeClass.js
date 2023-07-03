import JSONData from './example_data.json';
import * as THREE from 'three';

class Node {
  constructor(id, name, type, info, JSONchildren, JSONlinks, children = [], links = [], num_ancestors = 0, position = [0, 0, 0]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.info = info;
    this.JSONchildren = JSONchildren;
    this.JSONlinks = JSONlinks;
    this.children = children;
    this.num_ancestors = num_ancestors;
    this.position = position;
    this.links = links
  }


  add_child(child) {
    this.children.push(child);
  }

  get_ancestor_count() {
    return this.num_ancestors;
  }

  set_ancestor_count(count) {
    this.num_ancestors = count;
  }

  insert_to_js_file() {
    const fs = require('fs');

    // Create node's red circle and put it in position
    const content = `const ${this.name}_geometry = new THREE.SphereGeometry( 2.5, 16, 8 );\n` +
      `const ${this.name}_mesh = new THREE.Mesh(${this.name}_geometry, material);\n` +
      `${this.name}_mesh.position.set(${this.position[0]}, ${this.position[1]}, ${this.position[2]});\n` +
      `scene.add(${this.name}_mesh);\n`;

    fs.appendFileSync('test_script.js', content);

    let count = 0;
    for (const child of this.children) {
      // Define connection
      const connection_name = `${this.name}_connection_${count}`;
      const connection_content = `const ${connection_name} = new THREE.BufferGeometry();\n` +
        `const ${connection_name}_vertices = new Float32Array([\n` +
        `    ${this.position[0]}, ${this.position[1] + 1}, ${this.position[2] - 1}, // v0\n` +
        `    ${this.position[0]}, ${this.position[1] + 1}, ${this.position[2] + 1}, // v1\n` +
        `    ${child.position[0]}, ${child.position[1] + 1}, ${child.position[2] + 1}, // v2\n` +
        `    ${child.position[0]}, ${child.position[1] + 1}, ${child.position[2] + 1}, // v3\n` +
        `    ${child.position[0]}, ${child.position[1] - 1}, ${child.position[2] + 1}, // v4\n` +
        `    ${this.position[0]}, ${this.position[1] + 1}, ${this.position[2] - 1}  // v5\n` +
        `]);\n` +
        `${connection_name}.setAttribute('position', new THREE.BufferAttribute(${connection_name}_vertices, 3));\n` +
        `const ${connection_name}_mesh = new THREE.Mesh(${connection_name}, material3);\n` +
        `scene.add(${connection_name}_mesh);\n`;

      fs.appendFileSync('test_script.js', connection_content);

      count++;
      child.insert_to_js_file();
    }
  }

  space_position() {
    this.position[0] = this.position[0] * 10;
    this.position[1] = this.position[1] * 10;
    this.position[2] = this.position[2] * 10;

    for (const child of this.children) {
      child.space_position();
    }
  }

  getGeometry(){
    switch (this.type){
      case "root":
        return new THREE.SphereGeometry(2.5, 16, 8);
      case "assistant":
        return new THREE.BoxGeometry( 5, 5, 5 ); 

      case "module":
        return new THREE.SphereGeometry(2.5, 16, 8);
    }
  }

  getMaterial(){
    switch (this.type){
      case "root":
        return new THREE.MeshBasicMaterial({ color: 0x04ba0a })
      case "assistant":
        return new THREE.MeshBasicMaterial({ color: 0xf8fc74 })
      case "module":
        return new THREE.MeshBasicMaterial({ color: 0x74dffc })
    }
  }

  getMesh()
  {
    let newMesh = new THREE.Mesh(this.getGeometry(), this.getMaterial());
    newMesh.position.set(this.position[0],this.position[1],this.position[2])
    newMesh.name = this.id
    return newMesh;
  }
}
function CreateNodes(JSONData) {
  for (const obj of JSONData) {
    if (obj.type === 'root') {

      let rootNode = new Node(obj.id, obj.name, obj.type, obj.info, obj.children, obj.links)
      rootNode.set_ancestor_count(0)
      rootNode.position = [0, 0, 0];
      SetNodeTree(rootNode, JSONData)
      return rootNode;
    }
  }

}
function SetNodeTree(RootNode, JSONData) {
  let childCount = 0;
  for (const JSONchild of RootNode.JSONchildren) {
    childCount = childCount + 1;
    for (const obj of JSONData) {
      if (obj.id === JSONchild) {
        let newChild = new Node(obj.id, obj.name, obj.type, obj.info, obj.children, obj.links)
        RootNode.add_child(newChild)
        newChild.set_ancestor_count(RootNode.get_ancestor_count() + 1);
        positionNodes(RootNode, newChild, childCount);
        SetNodeTree(newChild, JSONData)
        //break;
      }
    }

  }
}
function printTree(node, indent = '', isLastChild = false) {
  const branch = isLastChild ? '└─ ' : '├─ ';
  console.log(indent + branch + node.name + ' (' + node.position[0] + ', ' + node.position[1] + ', ' + node.position[2] + ')');

  const childCount = node.children.length;
  for (let i = 0; i < childCount; i++) {
    const child = node.children[i];
    const isLast = i === childCount - 1;
    const childIndent = indent + (isLastChild ? '    ' : '│   ');
    printTree(child, childIndent, isLast);
  }
}
function positionNodes(rootNode, childNode, childCount) {
  const moveValue = Math.ceil(childCount/2) * ((-1)**(childCount-1))
  const depthLevel = childNode.get_ancestor_count();
  //Set X coordinate
  childNode.position[0] = depthLevel
  //Determine if Y or Z coordinate is increased
  if (depthLevel % 2 === 0) {
    //Determine if child is odd or even to branch in certain direction
    childNode.position[1] = rootNode.position[1] + moveValue

  } else if (depthLevel % 2 === 1) {
    childNode.position[2] = rootNode.position[2] + moveValue;
  }
  childNode.space_position();
}
let rootNode = CreateNodes(JSONData);
//printTree(rootNode)
export default rootNode;
