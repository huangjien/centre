import {Component, OnInit, ViewChild} from '@angular/core';
import {PanelModule, ContextMenu} from 'primeng/primeng';
import {
  TreeModule,
  TreeNode,
  MenuItem,
  ContextMenuModule,
  TreeNodeDragEvent
} from 'primeng/primeng';
import {Globals} from '../globals';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';

@Component({selector: 'app-tree', templateUrl: './tree.component.html', styleUrls: ['./tree.component.css']})
export class TreeComponent implements OnInit {

  nodes: TreeNode[];
  selectedNode: TreeNode;
  // viewOnlyContextMenuItems: MenuItem[];
  // addTestContextMenuItems: MenuItem[];
  // addInputContextMenuItems: MenuItem[];

  // @ViewChild('viewOnly')viewOnly: ContextMenu;
  // @ViewChild('addInput')addInput: ContextMenu;
  // @ViewChild('addTest')addTest: ContextMenu;

  constructor(private globals: Globals) {}

  // debugFlag = false;
  ngOnInit() {
    this
      .globals
      .getTreeRootNode()
      .subscribe(res => {
        // console.log(res[0]);
        const nodes = [];
        this.globals.rootID = res[0]['id'];
        nodes.push(this.createTreeNode(res[0]));
        this.nodes = nodes;
        this
          .globals
          .debug(res[0]);
      });
    // this.viewOnlyContextMenuItems = [
    //   {
    //     label: 'View',
    //     disabled: false,
    //     icon: 'fa-search',
    //     command: (event) => this.viewNode(event)
    //   }
    // ];
    // this.addInputContextMenuItems = [
    //   {
    //     label: 'View',
    //     disabled: false,
    //     icon: 'fa-search',
    //     command: (event) => this.viewNode(event)
    //   }, {
    //     label: 'Add Input',
    //     disabled: false,
    //     icon: 'fa-plus-square',
    //     command: (event) => this.addInputParameter(event)
    //   }
    // ];
    // this.addTestContextMenuItems = [
    //   {
    //     label: 'View',
    //     disabled: false,
    //     icon: 'fa-search',
    //     command: (event) => this.viewNode(event)
    //   }, {
    //     label: 'Add Test',
    //     disabled: false,
    //     icon: 'fa-plus-square',
    //     command: (event) => this.addReference(event)
    //   }
    // ];
  }

  dragStart(event: DragEvent, data) {
    console.log('drag start');
    event.dataTransfer.setData('testing', JSON.stringify(data));
    console.log(event.dataTransfer.getData('testing'));
    console.log(event);
    return;
  }

  // nodeMenu(event) {
  //   console.log('menu should show');
  //   console.log(event.node);
  //   this
  //     .viewOnly
  //     .show(event);
  //   return false;
  // }
  viewNode(event) {
    console.log(event);
    if (!this.selectedNode) {
      return;
    }

    const node_type = this.selectedNode.data['type'];
    if (!node_type) {
      return;
    }
    if (node_type === 'Root') {
      return;
    }

    this
      .globals
      .setContent(this.selectedNode.data);
    const currentid = this.selectedNode.data['id'];
    this
      .globals
      .contentChange
      .subscribe(res => {
        if (currentid === res['id']) {
          this.selectedNode.label = res['name'];
        }
      });
    this
      .globals
      .debug(JSON.stringify(this.selectedNode.data, null, 2));

  }

  addInputParameter(event) {
    if (!this.selectedNode) {
      return;
    }

    const node_type = this.selectedNode.data['type'];
    if (!node_type) {
      return;
    }
    if (node_type !== 'Data') {
      return;
    }
    const currentid = this.selectedNode.data['id'];
    this
      .globals
      .add_InputParameter(this.selectedNode.data);
    this
      .globals
      .debug(JSON.stringify(this.selectedNode.data, null, 2));
  }

  addReference(event) {
    if (!this.selectedNode) {
      return;
    }

    const node_type = this.selectedNode.data['type'];
    if (!node_type) {
      return;
    }
    if (node_type === 'Root' || node_type === 'Project' || node_type === 'Folder' || node_type === 'Data') {
      return;
    }
    const currentid = this.selectedNode.data['id'];
    this
      .globals
      .add_Reference(this.selectedNode.data);
    this
      .globals
      .debug(JSON.stringify(this.selectedNode.data, null, 2));
  }

  dropOnNode(event) {
    const source = event.dragNode;
    const target = event.dropNode;
    source.data['parentid'] = target.data['id'];
    this
      .globals
      .debug(source.data);
    // check the types, decide if we allow this drop: folder: allow data, OUT,
    // action, suite, case suite: allow nothing
    this
      .globals
      .save(JSON.stringify(source.data));
  }

  // dragStart(event, node: TreeNode) {   console.log('dragStart');
  // console.log(node);   console.log(event);   console.log(event.srcElement.id);
  // // this.globals.dragAndDropItem = node; } dragEnd(event) {
  // console.log('dragEnd');   console.log(event); }
  loadNode(event) {
    const nodes = [];
    if (event.node) {
      // console.log(event.node.data.id);
      this
        .globals
        .getChildrenNodes(event.node.data.id)
        .subscribe(res => {
          // console.log ('tree.loadNode'); console.log(res); nodes = res;
          for (const node of res) {
            nodes.push(this.createTreeNode(node));
          }
          event.node.children = nodes;
        }, error => {
          // console.log('handle error');
          event.node.leaf = true;
          console.log(event.node);
        });
    }
  }

  selectNode(event) {
    if (event.node) {
      this.globals.setContent(this.selectedNode.data);
      // this.setMenuItemsDisabled(this.selectedNode.data['type']);
      const currentid = this.selectedNode.data['id'];
      this
        .globals
        .contentChange
        .subscribe(res => {
          if (currentid === res['id']) {
            event.node.label = res['name'];
          }
        });
      this
        .globals
        .debug(JSON.stringify(this.selectedNode.data, null, 2));
    }
  }

  createTreeNode(obj: any): TreeNode {
    const treeNode = {
      data: obj,
      label: obj.name,
      pDraggable: 'references',
      expandedIcon: 'fa-folder-open',
      collapsedIcon: 'fa-folder',
      icon: this.getIcon(obj.type),
      id: obj.id,
      name: obj.id,
      draggable: this.isDraggable(obj.type),
      droppable: this.isDroppable(obj.type),
      selectable: this.isSelectable(obj.type),
      leaf: false
    };

    return treeNode;

  }

  // setMenuItemsDisabled(type: string) {
  //   if (type === 'Project') {
  //     this.setOneMenuItemDisabled(false, true, true);
  //   }
  //   if (type === 'Folder') {
  //     this.setOneMenuItemDisabled(false, true, true);
  //   }
  //   if (type === 'Suite') {
  //     this.setOneMenuItemDisabled(false, false, true);
  //   }
  //   if (type === 'Case') {
  //     this.setOneMenuItemDisabled(false, false, true);
  //   }
  //   if (type === 'OUT') {
  //     this.setOneMenuItemDisabled(false, false, true);
  //   }
  //   if (type === 'Data') {
  //     this.setOneMenuItemDisabled(false, false, true);
  //   }
  //   if (type === 'Root') {
  //     this.setOneMenuItemDisabled(true, true, true);
  //   }
  // }

  // setOneMenuItemDisabled(view: boolean, addReference: boolean, addInput: boolean) {
  //   this
  //     .viewOnlyContextMenuItems
  //     .forEach(item => {
  //       if (item['label'] === 'View') {
  //         item['disabled'] = view;
  //       }
  //       if (item['label'] === 'Add Reference') {
  //         item['disabled'] = addReference;
  //       }
  //       if (item['label'] === 'Add Input Paremeter') {
  //         item['disabled'] = addInput;
  //       }
  //     });
  // }

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
      return 'fa-th-list';
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
    if (type === 'OUT' || type === 'Action' || type === 'Suite' || type === 'Case' || type === 'Data') {
      return false;
    }
    return true;
  }

}
