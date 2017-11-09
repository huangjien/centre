
import { Injectable } from '@angular/core';
@Injectable()
export class Helper {

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
    getCols(ref_type: string): any[] {
        const cols: any[] = [];
        cols.push({ field: 'order', header: '#', style: { 'width': '3em', 'text-align': 'center' } });

        if (ref_type === 'references') {
            cols.push({ field: 'name', header: 'Name', style: {} });
            cols.push({ field: 'type', header: 'Type', style: {} });
        }
        if (ref_type === 'objects') {
            cols.push({ field: 'name', header: 'Name', style: {} });
            cols.push({ field: 'way', header: 'Way', style: {} });
            cols.push({ field: 'identity', header: 'Identity', style: {} });
        }
        if (ref_type === 'data') {
            cols.push({ field: 'key', header: 'Key', style: {} });
            cols.push({ field: 'value', header: 'Value', style: {} });
        }
        if (ref_type === 'inputs') {
            cols.push({ field: 'name', header: 'Name', style: {} });
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
