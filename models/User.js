var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// schema // 1
var userSchema = mongoose.Schema({
    username: { type: String, required: [true, 'Username is required!'], unique: true },
    password: { type: String, required: [true, 'Password is required!'], select: false },
    name: { type: String, required: [true, 'Name is required!'] },
    email: { type: String }
}, {
    toObject: { virtuals: true }
});

// virtual: db에는 필요없지만 모델로 사용하고 싶을 때 사용한다.
userSchema.virtual('passwordConfirmation')
    .get(function () { return this._passwordConfirmation; })
    .set(function (value) { this._passwordConfirmation = value; });

userSchema.virtual('originalPassword')
    .get(function () { return this._originalPassword; })
    .set(function (value) { this._originalPassword = value; });

userSchema.virtual('currentPassword')
    .get(function () { return this._currentPassword; })
    .set(function (value) { this._currentPassword = value; });

userSchema.virtual('newPassword')
    .get(function () { return this._newPassword; })
    .set(function (value) { this._newPassword = value; });

userSchema.path('password').validate(function (v) {
    var userModel = this;
    create(userModel)
    update(userModel)
});

// password validation
function create(user) {
    if (user.isNew) {
        console.log('isNewCreate');
        if (!user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation is required.');
        }

        if (user.password !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
        console.log('isNewCreated');
    }
}

function update(user) {
    if (!user.isNew) {
        console.log('isNewUpdate')
        if (!user.currentPassword) {
            user.invalidate('currentPassword', 'Current Password is required!');
        }
        else if (user.currentPassword != user.originalPassword) {
            user.invalidate('currentPassword', 'Current Password is invalid!');
        }

        if (user.newPassword !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
        console.log('isNewUpdated');
    }
}
/*
userSchema.pre('save', next => {
    var user = this;
    if(!user.isModified('password')) {
        return next();
    }
    else {
        user.password = bcrypt.hashSync(user.password);
        return next();
    }
});

// 로그인 시 사용할 메서드
userSchema.methods.authenticate = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};*/

module.exports = mongoose.model('user', userSchema);