import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/primeng';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { Globals } from '../globals';
import {TreeDragDropService} from 'primeng/primeng';
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  nodes: TreeNode[];
  selectedNode: TreeNode;

  constructor(private globals: Globals) { }

  debugFlag = false;
  ngOnInit() {
    this.globals.getTreeRootNode().subscribe(res => {
      // console.log(res);
      this.nodes = res;
      // this.globals.debug(res);
    });
  }

  loadNode(event) {
    if (this.debugFlag) {
      return;
    }
    if (event.node) {
      this.debugFlag = true;
      this.globals.getChildrenNodes().subscribe(nodes => event.node.children = nodes);
    }
  }

  selectNode(event) {
    if (event.node) {
      this.globals.infoMessage('Node', 'A Node is Selected\n' + this.selectedNode);
      console.log(this.selectedNode);
    }
  }

}
