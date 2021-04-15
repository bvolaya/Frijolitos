
class Search {
    constructor(term,result) {
        this._term = term
        this._result = result
    }

    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
    }

    get term() {
        return this._term;
    }

    set term(value) {
        this._term = value;
    }
}

module.exports = Search