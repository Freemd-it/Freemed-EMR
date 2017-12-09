webpackHotUpdate(0,{

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableRenderMedicine = [];

(0, _jquery2.default)(document).ready(function () {
    if ((0, _jquery2.default)('#PharmacyOCSTableBody').children().length) (0, _jquery2.default)('#PharmacyOCSTableBody *').remove();

    _jquery2.default.ajax({
        type: 'GET',
        url: 'http://localhost:3000/waitingList',
        dataType: 'json',
        cache: false
    }).done(function (result) {

        var convertStatus = '';

        for (var i = 0; i < result.length; i++) {

            convertStatus = getStatus(result[i].status);
            (0, _jquery2.default)('#PharmacyOCSTableBody').append('<tr id=' + result[i].chart_id + ' class="table-content">\n                   <td>' + result[i].name + '</td>\n                   <td>' + convertStatus + '</td>\n            </tr>');
        }
    });

    _jquery2.default.ajax({
        type: 'GET',
        url: 'http://localhost:3000/medicine/list',
        dataType: 'json',
        cache: false
    }).done(function (result) {

        window.localStorage.setItem('medicine', JSON.stringify(result));
    });
});

(0, _jquery2.default)('.getPharmacyOCS').on('click', function () {

    if ((0, _jquery2.default)('#PharmacyOCSTableBody').children().length) (0, _jquery2.default)('#PharmacyOCSTableBody *').remove();

    _jquery2.default.ajax({
        type: 'GET',
        url: 'http://localhost:3000/waitingList',
        dataType: 'json',
        cache: false
    }).done(function (result) {

        var convertStatus = '';

        for (var i = 0; i < result.length; i++) {

            convertStatus = getStatus(result[i].status);
            (0, _jquery2.default)('#PharmacyOCSTableBody').append('<tr id=' + result[i].chart_id + ' class="table-content">\n                   <td>' + result[i].name + '</td>\n                   <td>' + convertStatus + '</td>\n            </tr>');
        }
    });
});

(0, _jquery2.default)('#pharmacopoeia').on('click', function () {

    (0, _jquery2.default)(".main-category-select").prop("disabled", true);

    if ((0, _jquery2.default)('.main-category-select > select').children().length) {
        (0, _jquery2.default)('.main-category-select > select *').remove();
        (0, _jquery2.default)('.main-category-select > select').append('<option value=\'\'>\uB300\uBD84\uB958</option>');
    }

    if ((0, _jquery2.default)('.small-category-select > select').children().length) {
        (0, _jquery2.default)('.small-category-select > select *').remove();
        (0, _jquery2.default)('.small-category-select > select').append('<option value=\'\'>\uC18C\uBD84\uB958</option>');
    }

    _jquery2.default.ajax({
        type: 'GET',
        url: 'http://localhost:3000/medicine/category/main',
        dataType: 'json',
        cache: false
    }).done(function (result) {
        for (var i = 0; i < result.length; i++) {

            (0, _jquery2.default)('.main-category-select > select').append('<option value=\'' + result[i].primaryCategory + '\'> ' + result[i].primaryCategory + ' </option>');
        }
    });
    (0, _jquery2.default)('.ui.longer.modal').modal('show');
});

(0, _jquery2.default)('.main-category-select').change(function () {
    var param = {
        primaryCategory: (0, _jquery2.default)('.main-category-select option:selected').attr('value')
    };

    if ((0, _jquery2.default)('.small-category-select > select').children().length) {
        (0, _jquery2.default)('.small-category-select > select *').remove();
        (0, _jquery2.default)('.small-category-select > select').append('<option value=\'\'>\uC18C\uBD84\uB958</option>');
    }

    _jquery2.default.ajax({
        type: 'GET',
        url: 'http://localhost:3000/medicine/category/small',
        data: param,
        dataType: 'json',
        cache: false
    }).done(function (result) {
        console.log(result);
        for (i in result) {
            console.log(i);
            console.log(typeof i === 'undefined' ? 'undefined' : _typeof(i));
            if (i === '0') {

                (0, _jquery2.default)('.small-category-select > select').nextAll('div.text').text('' + result[i].secondaryCategory);

                (0, _jquery2.default)('.small-category-select > select').append('<option selected value=\'' + result[i].secondaryCategory + '\'> ' + result[i].secondaryCategory + ' </option>');
                var medicine = JSON.parse(window.localStorage.getItem('medicine'));
                var categoryMain = (0, _jquery2.default)('.main-category-select option:selected').text();
                var categorySmall = (0, _jquery2.default)('.small-category-select option:selected').text();
                tableRenderMedicine = [];

                medicine.find(function (x) {
                    if (_jquery2.default.trim(x.primaryCategory) === _jquery2.default.trim(categoryMain) && _jquery2.default.trim(x.secondaryCategory) === _jquery2.default.trim(categorySmall)) {
                        tableRenderMedicine.push(x);
                    }
                });

                if ((0, _jquery2.default)('#medicineTableBody').children().length) (0, _jquery2.default)('#medicineTableBody *').remove();

                for (var i = 0; i < tableRenderMedicine.length; i++) {
                    (0, _jquery2.default)('#medicineTableBody').append('<tr id=' + tableRenderMedicine[i].id + '>\n                       <td>' + tableRenderMedicine[i].name + '</td>\n                       <td>' + tableRenderMedicine[i].ingredient + '</td>\n                       <td>' + tableRenderMedicine[i].medication + '</td>\n                       <td>' + tableRenderMedicine[i].property + '</td>\n                </tr>');
                }
            } else {
                console.log(result[i].secondaryCategory);
                (0, _jquery2.default)('.small-category-select > select').append('<option value=\'' + result[i].secondaryCategory + '\'> ' + result[i].secondaryCategory + ' </option>');
            }
        }
    });
});

(0, _jquery2.default)('.small-category-select').change(function () {
    var medicine = JSON.parse(window.localStorage.getItem('medicine'));
    var categoryMain = (0, _jquery2.default)('.main-category-select option:selected').text();
    var categorySmall = (0, _jquery2.default)('.small-category-select option:selected').text();
    tableRenderMedicine = [];

    medicine.find(function (x) {
        if (_jquery2.default.trim(x.primaryCategory) === _jquery2.default.trim(categoryMain) && _jquery2.default.trim(x.secondaryCategory) === _jquery2.default.trim(categorySmall)) {
            tableRenderMedicine.push(x);
        }
    });

    if ((0, _jquery2.default)('#medicineTableBody').children().length) (0, _jquery2.default)('#medicineTableBody *').remove();

    for (var i = 0; i < tableRenderMedicine.length; i++) {
        (0, _jquery2.default)('#medicineTableBody').append('<tr id=' + tableRenderMedicine[i].id + '>\n               <td>' + tableRenderMedicine[i].name + '</td>\n               <td>' + tableRenderMedicine[i].ingredient + '</td>\n               <td>' + tableRenderMedicine[i].medication + '</td>\n               <td>' + tableRenderMedicine[i].property + '</td>\n        </tr>');
    }
});

(0, _jquery2.default)('.pharmacySearchButton').on('click', function () {
    var searchText = (0, _jquery2.default)('input[name=medicineSearchText]').val();
    var option = (0, _jquery2.default)('.medicineSearchSelect option:selected').val();
    var param = {
        searchText: searchText,
        option: option
    };
    console.log(param);
});

function getStatus(status) {

    switch (status) {
        case 1:
            return '접수';break;
        case 2:
            return '예진';break;
        case 3:
            return '본진';break;
        case 4:
            return '대기';break;
        case 5:
            return '조제';break;
        case 6:
            return '완료';break;
    }
}

/***/ })

})