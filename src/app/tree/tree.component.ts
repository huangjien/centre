import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/primeng';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { Globals } from '../globals';
import { TreeDragDropService } from 'primeng/primeng';
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  nodes: TreeNode[];
  selectedNode: TreeNode;

  constructor(private globals: Globals) { }

  // debugFlag = false;
  ngOnInit() {
    this.globals.getTreeRootNode().subscribe(res => {
      console.log(res);
      const nodes = [];
      nodes.push(this.createTreeNode(res));
      this.nodes = nodes;
      this.globals.debug(res);
    });
  }

  loadNode(event) {
    const nodes = [];
    if (event.node) {
      for (const node of this.globals.getChildrenNodes(event.node.data.children)) {
        node.subscribe(res => {
          nodes.push(this.createTreeNode(res));
        });
      }
      event.node.children = nodes;
    }
  }

  selectNode(event) {
    if (event.node) {
      // this.globals.infoMessage('Node', 'A Node is Selected: \n' + JSON.stringify(this.selectedNode.data));
      console.log(this.selectedNode);
      this.globals.debug(JSON.stringify(this.selectedNode.data));
    }
  }

  createTreeNode(obj: any): TreeNode {
    const treeNode = {
      data: obj, label: obj.name, type: obj.type,
      expandedIcon: 'fa-folder-open', collapsedIcon: 'fa-folder',
      icon: this.getIcon(obj.type),
      draggable: this.isDraggable(obj.type),
      droppable: this.isDroppable(obj.type),
      selectable: this.isSelectable(obj.type),
      leaf: this.isLeaf(obj)
    };

    return treeNode;

  }

  getIcon(type: string): string {
    if (type === 'Project') {
      return 'fa-file-powerpoint-o';
    }
    if (type === 'Folder') {
      return 'fa-folder-o';
    }
    if (type === 'Suite') {
      return 'fa-suitcase';
    }
    if (type === 'Case') {
      return 'fa-briefcase';
    }
    if (type === 'OUT') {
      return 'fa-suitcase';
    }
    if (type === 'Action') {
      return 'fa-flash';
    }
    if (type === 'Data') {
      return 'fa-database';
    }
    if (type === 'Root') {
      return 'fa-flag';
    }
    return 'fa-circle-o';
  }

  isLeaf(obj: any): boolean {
    if (obj.children === null) {
      return true;
    }
    if (obj.children === undefined) {
      return true;
    }
    return false;
  }

  isSelectable(type: string): boolean {
    if (type === 'Root') {
      return false;
    }
    return true;
  }

  isDraggable(type: string): boolean {
    if (type === 'Project' || type === 'Root') {
      return false;
    }
    return true;
  }

  isDroppable(type: string): boolean {
    if (type === 'OUT' || type === 'Action') {
      return false;
    }
    return true;
  }

}
