'use strict';

var getcsrfValue = void 0;

var handleSubmit = function handleSubmit(e) {
    e.preventDefault();

    $('#domoMessage').animate({ width: 'hide' }, 350);

    if ($('#domoName').val() == '' || $('#domoText').val() == '') {
        handleError('RAWR! All fields are required');
        return false;
    }

    sendAjax('POST', $('#postForm').attr('action'), $('#postForm').serialize(), function () {
        loadDomosFromServer($('#postForm')[0][3].value);
    });
    return false;
};

var handlePasswordChange = function handlePasswordChange(e) {
    e.preventDefault();

    if ($('#pass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
        handleError('Password is empty');
        return false;
    }
    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#changeForm").attr("action"), $("#changeForm").serialize(), redirect);

    return false;
};

var ChangePassWindow = function ChangePassWindow(props) {
    return React.createElement(
        'form',
        { id: 'changeForm', name: 'changeForm', onSubmit: handlePasswordChange, action: '/changePass', method: 'POST', className: 'mainForm' },
        React.createElement(
            'label',
            { htmlFor: 'oldPass' },
            'Current Password: '
        ),
        React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'password' }),
        React.createElement(
            'label',
            { htmlFor: 'newPass' },
            'New Password: '
        ),
        React.createElement('input', { id: 'newPass', type: 'password', name: 'newPass', placeholder: 'new password' }),
        React.createElement(
            'label',
            { htmlFor: 'newPass2' },
            'Retype New Password: '
        ),
        React.createElement('input', { id: 'newPass2', type: 'password', name: 'newPass2', placeholder: 'retype new password' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement('input', { className: 'formSubmit', id: 'changePassid', type: 'submit', value: 'Change Password' })
    );
};

var UpgradeWindow = function UpgradeWindow(props) {
    return React.createElement(
        'div',
        null,
        'Coming Soon TM'
    );
};

var ChangeContentWindow = function ChangeContentWindow(props) {
    return React.createElement('div', null);
};

var createChangePassWindow = function createChangePassWindow(csrf) {
    ReactDOM.render(React.createElement(ChangePassWindow, { csrf: csrf }), document.querySelector('#createCSS'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#createContext'));
};

var UpgradePassWindow = function UpgradePassWindow(csrf) {
    ReactDOM.render(React.createElement(UpgradeWindow, { csrf: csrf }), document.querySelector('#createCSS'));
    ReactDOM.render(React.createElement(ChangeContentWindow, { csrf: csrf }), document.querySelector('#createContext'));
};

var createPersonalWindow = function createPersonalWindow(csrf) {
    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf, title: 'Title', content: 'Story . . .', imgSrc: '' }), document.querySelector('#createCSS'));
};

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    console.log($('#postForm').serialize());

    $('#domoMessage').animate({ width: 'hide' }, 350);

    if ($('#domoName').val() == '' || $('#domoText').val() == '') {
        handleError('RAWR! All fields are required');
        return false;
    }

    sendAjax('POST', $('#postForm').attr('action'), $('#postForm').serialize(), function () {
        loadDomosFromServer($('#postForm')[0][3].value);
    });
    return false;
};

var DomoForm = function DomoForm(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'form',
            { id: 'postForm', onSubmit: handleDomo, name: 'postForm', action: '/maker', method: 'POST', className: 'postForm' },
            React.createElement('input', { id: 'domoName', type: 'text', name: 'name', size: '55', placeholder: 'TITLE' }),
            React.createElement(
                'div',
                null,
                React.createElement('textarea', { id: 'domoText', rows: '25', cols: '104', maxlength: '500', name: 'text', placeholder: 'Story Time' })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('input', { id: 'domoRelate', type: 'text', name: 'relate', placeholder: 'ImageURL', value: props.imgSrc, onChange: updateImg }),
                React.createElement('input', { id: 'domoImg', type: 'image', placeholder: 'Relate',
                    src: props.imgSrc })
            ),
            React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
            React.createElement('input', { className: 'makeDomoSubmit', type: 'submit', value: 'Publish' })
        )
    );
};

var updateImg = function updateImg(e) {
    ReactDOM.render(React.createElement(DomoForm, { csrf: getcsrfValue, title: 'Title', content: 'Story . . .', imgSrc: e.target.value }), document.querySelector('#createCSS'));
};

var deleteDomo = function deleteDomo(e) {
    console.log(e.target.name.value);
    //console.log($('#deleteForm')[0][1].value);
    //console.log('name='+e.target.name.value+'&text='+e.target.text.value+'&_csrf='+e.target._csrf.value);
    e.preventDefault();
    sendAjax('POST', $('#deleteForm').attr('action'), 'name=' + e.target.name.value + '&text=' + e.target.text.value + '&_csrf=' + e.target._csrf.value, function () {
        loadDomosFromServer($('#deleteForm')[0][1].value);
    });

    return false;
};

var DomoList = function DomoList(props) {
    if (props.domos.length === 0) {
        return React.createElement(
            'div',
            { className: 'domoList' },
            React.createElement(
                'h3',
                { className: 'emptyDomo' },
                'No Article yet! Lets start your first one here'
            )
        );
    };

    var domoNodes = props.domos.map(function (domo) {
        var temp = domo.text.split(/\n/);
        return React.createElement(
            'div',
            { key: domo._id, className: 'domo' },
            React.createElement(
                'h3',
                { classNAme: 'domoName' },
                React.createElement(
                    'b',
                    null,
                    domo.name
                )
            ),
            React.createElement(
                'p',
                { className: 'domoText' },
                temp
            ),
            React.createElement('img', { className: 'domoRelate', src: domo.relate }),
            React.createElement(
                'form',
                { id: 'deleteForm', onSubmit: deleteDomo, name: 'deleteForm', action: '/deleteDomo', method: 'POST', className: 'deleteForm' },
                React.createElement('input', { type: 'hidden', name: 'name', value: domo.name }),
                React.createElement('input', { type: 'hidden', name: 'text', value: domo.text }),
                React.createElement('input', { type: 'hidden', name: '_csrf', value: getcsrfValue }),
                React.createElement('input', { className: 'deleteFormSubmit', type: 'submit', value: 'Delete' })
            )
        );
    });

    return React.createElement(
        'div',
        { className: 'domoList' },
        domoNodes
    );
};

var ExploreList = function ExploreList(props) {
    if (props.explores.length === 0) {
        return React.createElement(
            'div',
            { className: 'domoList' },
            React.createElement(
                'h3',
                { className: 'emptyDomo' },
                'No Article yet! Lets start your first one here'
            )
        );
    };

    var domoNodes = props.explores.map(function (domo) {
        var temp = domo.text.split(/\n/);
        return React.createElement(
            'div',
            { key: domo._id, className: 'domo' },
            React.createElement(
                'h3',
                { classNAme: 'domoName' },
                React.createElement(
                    'b',
                    null,
                    domo.name
                )
            ),
            React.createElement(
                'p',
                { className: 'domoText' },
                temp
            ),
            React.createElement('img', { className: 'domoRelate', src: domo.relate })
        );
    });

    return React.createElement(
        'div',
        { className: 'domoList' },
        domoNodes
    );
};

var loadDomosFromServer = function loadDomosFromServer(csrf) {
    sendAjax('GET', '/getDomos', null, function (data) {

        ReactDOM.render(React.createElement(DomoList, { csrf: csrf, domos: data.domos }), document.querySelector('#createContext'));
    });
};

var loadExploreFromServer = function loadExploreFromServer(csrf) {
    sendAjax('GET', '/getExplore', null, function (data) {
        console.log(data);
        ReactDOM.render(React.createElement(ExploreList, { csrf: csrf, explores: data.domos }), document.querySelector('#createContext'));
    });
};

var setup = function setup(csrf) {
    var changePassButton = document.querySelector('#changeButton');

    changePassButton.addEventListener('click', function (e) {
        e.preventDefault();
        createChangePassWindow(csrf);
        return false;
    });
    var UpgradeButton = document.querySelector('#premiumButton');

    UpgradeButton.addEventListener('click', function (e) {
        e.preventDefault();
        UpgradePassWindow(csrf);
        return false;
    });
    var changePersonalButton = document.querySelector('#personalButton');

    changePersonalButton.addEventListener('click', function (e) {
        e.preventDefault();
        createPersonalWindow(csrf);
        loadDomosFromServer(csrf);
        return false;
    });
    getcsrfValue = csrf;
    loadExploreFromServer(csrf);
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
        console.log('setup' + result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
'use strict';

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  $('#domoMessage').animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $('#domoMessage').animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
