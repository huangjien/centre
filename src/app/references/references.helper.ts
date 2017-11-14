
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
@Injectable()
export class Helper {

    formTypeOptions = [
        {
          label: 'Select ...',
          value: null
        }, {
          label: 'id',
          value: 'id'
        }, {
          label: 'text',
          value: 'text'
        }, {
          label: 'editor',
          value: 'editor'
        }, {
          label: 'multi',
          value: 'multi'
        }, {
          label: 'single',
          value: 'single'
        }, {
          label: 'references',
          value: 'references'
        }
      ];

      wayOptions = [
        {
          label: 'id',
          value: 'id'
        }, {
          label: 'tagName',
          value: 'tagName'
        }, {
          label: 'xpath',
          value: 'xpath'
        }, {
          label: 'className',
          value: 'className'
        }, {
          label: 'csssSelector',
          value: 'csssSelector'
        }, {
          label: 'linkText',
          value: 'linkText'
        }, {
          label: 'name',
          value: 'name'
        }, {
          label: 'partialLinkText',
          value: 'partialLinkText'
        }
      ];

    constructor(private globals: Globals) { }
    addOneRow(ref_type: string, maxOrder: string): any {
        if (ref_type === 'data') {
            return {'order': maxOrder, 'key': 'newKey', 'value': 'value', 'disabled': true };
        }
        if (ref_type === 'objects') {
            return {'order': maxOrder, 'name': 'newName', 'way': 'id', 'identity': 'newName', 'disabled': true };
        }
        if (ref_type === 'fields') {
            return {'order': maxOrder, 'name': 'newName', 'type': 'text', 'readOnly': false, 'validators': [], 'disabled': true };
        }
    }

    isDroppedAllowed(dragSource: string, dropTarget: string): boolean {
        if (dragSource === 'Data' && dropTarget === 'parameters') {
            return true;
        }
        if (dragSource === 'Case' && dropTarget === 'references') {
            return true;
        }
        if (dragSource === 'OUT' && dropTarget === 'actions') {
            return true;
        }
        // TODO: OUT can be dropped to objects, but have not think out how to handle it.

        this.globals.warnMessage('Drop Not Allowed', dragSource + ' is not acceptable by ' + dropTarget);
        return false;
    }
    getCols(ref_type: string): any[] {
        const cols: any[] = [];
        cols.push({ field: 'order', header: '#', style: { 'width': '3em', 'text-align': 'center' } });

        if (ref_type === 'references') {
            cols.push({ field: 'name', header: 'Name', style: {} });
            cols.push({ field: 'type', header: 'Type', style: {} });
        }
        if (ref_type === 'objects') {
            cols.push({ field: 'name', header: 'Name', style: {} });
            cols.push({ field: 'objects', header: 'Objects', style: {} });
        }
        if (ref_type === 'data') {
            cols.push({ field: 'key', header: 'Key', style: {} });
            cols.push({ field: 'value', header: 'Value', style: {} });
        }
        if (ref_type === 'parameters') {
            cols.push({ field: 'key', header: 'Key', style: {} });
            cols.push({ field: 'value', header: 'Value', style: {} });
        }
        if (ref_type === 'fields') {
            cols.push({ field: 'name', header: 'Name', style: {} });
            cols.push({ field: 'type', header: 'Type', style: {} });
            cols.push({ field: 'readOnly', header: 'Read Only', style: {} });
            cols.push({ field: 'validators', header: 'Validators', style: {} });
        }
        if (ref_type === 'actions') {
            cols.push({ field: 'name', header: 'OUT Name', style: {} });
            cols.push({ field: 'type', header: 'OUT Type', style: {} });
            cols.push({ field: 'action', header: 'Action', style: {} });
            cols.push({ field: 'variableName', header: 'Variable', style: {} });
            cols.push({ field: 'dataName', header: 'Data Name', style: {} });
            cols.push({ field: 'subData', header: 'Data Key', style: {} });
            cols.push({ field: 'retrive', header: 'Retrive', style: {} });
            cols.push({ field: 'outputVariable', header: 'Output Variable', style: {} });
        }
        if (ref_type === 'logs') {
            cols.push({ field: 'dateTime', header: 'Date Time', style: {} });
            cols.push({ field: 'result', header: 'Result', style: {} });
            cols.push({ field: 'log', header: 'Log', style: {} });
        }

        cols.push({ field: 'disabled', header: 'Disabled', style: { 'width': '8em', 'text-align': 'center' } });
        return cols;
    }
}
