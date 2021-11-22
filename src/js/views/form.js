import { getAutocompleteInstance, getDatePickerInstance } from '../plugins/materialize';

class FormUI {
    constructor(autocompleteInstance, dataPickerInstance) {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-dapart');
        this.return = document.getElementById('datepicker-return');
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destionationAutocomplete = autocompleteInstance(this.destination);
        this.departDataPicker = dataPickerInstance(this.depart);
        this.returntDataPicker = dataPickerInstance(this.return);
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;

    }

    get destinationValue() {
        return this.destination.value;

    }

    get depertDateValue() {
        return this.departDataPicker.toString();

    }

    get returnDateValue() {
        return this.returntDataPicker.toString();

    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destionationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;