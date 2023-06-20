import json

class Node:
    def __init__(self, name, children=None, num_ancestors=0, position=None):
        self.name = name
        self.children = children if children is not None else []
        self.num_ancestors = num_ancestors
        self.position = position if position is not None else [0,0,0]

    def add_child(self, child):
        self.children.append(child)

    def get_ancestor_count(self):
        return self.num_ancestors

    def set_ancestor_count(self, count):
        self.num_ancestors = count
    
    def print_tree(self, indent="", is_last_child=False):
        branch = "└─ " if is_last_child else "├─ "
        print(indent + branch + self.name + " (" + str(self.position[0]) + ", "+ str(self.position[1]) +", "+ str(self.position[2]) + ")")

        child_count = len(self.children)
        for i, child in enumerate(self.children):
            is_last = i == child_count - 1
            child_indent = indent + ("    " if is_last_child else "│   ")
            child.print_tree(child_indent, is_last)

    def build_3d(self):
     # positions: 0=x,1=y,2=z
     if self.num_ancestors == 0:
        self.position = [0,0,0]
     else:
         self.position[0] = self.num_ancestors * 10

    def insert_to_js_file(self):
        #Create node's red circle and put it in position
        #self.position[0] = self.position[0] * 20
       # self.position[1] = self.position[1] * 20
       # self.position[2] = self.position[2] * 20
        with open('test_script.js', 'a') as f:
            content = "const " + str(self.name) + "_geometry = new THREE.SphereGeometry( 2.5, 16, 8 );\n"
            content += "const "+str(self.name) + "_mesh = new THREE.Mesh("+str(self.name)+"_geometry, material);\n"
            content += str(self.name)+"_mesh.position.set("+str(self.position[0])+", "+str(self.position[1])+","+str(self.position[2])+");\n"
            content += "scene.add("+str(self.name)+"_mesh)\n"
            f.write(content)
        count = 0
        #connection the node to its children nodes and then recursively call them
        for child in self.children:
            with open('test_script.js', 'a') as f:
                #define connection
                connection_name = str(self.name)+"_connection_"+str(count)
                content = "const "+connection_name+" = new THREE.BufferGeometry()\n"
                content += '''const '''+connection_name+'''_vertices = new Float32Array( [
	                        '''+str(self.position[0])+''','''+str(self.position[1]+1)+''','''+str(self.position[2]-1)+''', // v0
	                        '''+str(self.position[0])+''','''+str(self.position[1]+1)+''','''+str(self.position[2]+1)+''', // v1
	                        '''+str(child.position[0])+''','''+str(child.position[1]+1)+''','''+str(child.position[2]+1)+''', // v2

	                        '''+str(child.position[0])+''','''+str(child.position[1]+1)+''','''+str(child.position[2]+1)+''', // v3
	                        '''+str(child.position[0])+''','''+str(child.position[1]-1)+''','''+str(child.position[2]+1)+''', // v4
	                        '''+str(self.position[0])+''','''+str(self.position[1]+1)+''','''+str(self.position[2]-1)+'''  // v5
                            ] );\n'''
                #Add Mesh and Add to Scene!
                content += connection_name+".setAttribute( 'position', new THREE.BufferAttribute( "+connection_name+"_vertices, 3 ) );\n"
                content += "const "+connection_name+"_mesh = new THREE.Mesh( "+connection_name+", material3 );\n"
                content += "scene.add("+connection_name+"_mesh)\n"
                f.write(content)
            count += 1
            child.insert_to_js_file()
    
    def space_position(self):
        self.position[0] = self.position[0] * 10
        self.position[1] = self.position[1] * 10
        self.position[2] = self.position[2] * 10
        for child in self.children:
            child.space_position()

def build_tree_from_file(file_path):
    nodes = {}
    root = None

    with open(file_path, "r") as file:
        for line in file:
            line = line.strip()
            if not line:
                continue  # Skip empty lines

            if ":" in line:
                parent_name, child_names = line.split(":")
                parent_name = parent_name.strip()
                child_names = [name.strip() for name in child_names.split(",")]

                if parent_name not in nodes: #This is a root note
                    parent = Node(parent_name)
                    parent.position = [0, 0 ,0]
                    nodes[parent_name] = parent
                else: #this is a parent node which has children but not the root
                    parent = nodes[parent_name]

                if root is None:
                    root = parent
                
                child_count = 0

                for child_name in child_names:
                    if child_name not in nodes:
                        child = Node(child_name, num_ancestors=parent.get_ancestor_count() + 1)
                        nodes[child_name] = child
                    else:
                        child = nodes[child_name]
                    
                    child.position[0] = parent.get_ancestor_count() + 1
                    if(parent.get_ancestor_count()%2 == 0):
                        
                        child.position[1] = parent.position[1] + 1 + child_count
                        child.position[2] = parent.position[2]
                    
                    if(parent.get_ancestor_count()%2 == 1):
                        child.position[2] = parent.position[2] + 1 + child_count
                        child.position[1] = parent.position[1]
                    parent.add_child(child)
                    child_count += 1

    return root

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            json_data = json.load(file)
            return json_data
    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON file: {file_path}\n{e}")

# Usage example
#root_node = build_tree_from_file("input.txt")
#root_node.space_position()
#root_node.print_tree()
#root_node.insert_to_js_file()

file_path = 'example_data.json'
data = read_json_file(file_path)

main_menu_info = data['main_menu']
info = main_menu_info['info']
print(info)