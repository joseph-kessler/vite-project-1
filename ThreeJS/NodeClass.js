/**
 *  @Author Joseph Kessler, joe@apskc.net
 *  @date June, 2023
 */

// Imports include: input data from a JSON file, and the THREE JS library
import JSONData from './example_data.json';
import * as THREE from 'three';

/**
 * Node class is composed of the following
 */
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

  getConnectionGeometry(parentPosition,childPosition)
  {
    let vertices = new Float32Array([
      parentPosition[0], parentPosition[1]+1, parentPosition[2]-1,
      parentPosition[0], parentPosition[1]+1, parentPosition[2]+1,
      childPosition[0],childPosition[1]+1,childPosition[2]+1,
      childPosition[0],childPosition[1]+1,childPosition[2]+1,
      childPosition[0],childPosition[1]-1,childPosition[2]+1,
      parentPosition[0], parentPosition[1]+1, parentPosition[2]-1,
    ])
    let connectionGeometry = new THREE.BufferGeometry;
    connectionGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return connectionGeometry;
  }
  
  getConnectionMaterial(connectionType)
  {
    connectionType = 'temp';
    switch(connectionType){
      case 'temp':
        return new THREE.MeshBasicMaterial({ color: 0xD3D3D3, side: THREE.DoubleSide, opacity: 0.5, });
    }
  }
  getConnectionMesh()
  {
    let connectionArray = [];
    for (const child of this.children)
    {
      let connectionGeometry = this.getConnectionGeometry(this.position,child.position);
      let connectionMaterial = this.getConnectionMaterial("this.Connection.type");
      connectionArray.push(new THREE.Mesh(connectionGeometry,connectionMaterial));
    }
    return connectionArray;
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
