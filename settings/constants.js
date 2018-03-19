const AppConstants = {
    USERNAME_MIN_LENGTH: 4,
    USERNAME_MAX_LENGTH: 24,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 24,
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 24,
    EMAIL_MIN_LENGTH: 6,
    EMAIL_MAX_LENGTH:30,
    USERNAME_REG_EXP: /^[\w+_]{4,24}$/,
    PASSWORD_REG_EXP: /^[\w+_-]{6,20}$/,
    NOT_PASSWORD_REG_EXP: /^(\w+)?(password)(\w+)?$/i,
    NUMBER_REG_EXP: /^[+-]?(([0-9])+([.][0-9]*)?|[.][0-9]+)$/,
    SYMBOL_REG_EXP: /^[!@#\$%\^\&*\)\(+=~._-]+$/,
    EMAIL_REG_EXP:  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    NAME_REG_EXP:    /^[a-z A-Z]+((['_. -][a-z A-Z ])?[a-zA-Z]*)$/
}

module.exports = AppConstants;
