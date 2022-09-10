import React from 'react';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import TagList from './tagList';

export const FieldWrapper = ({
    className, //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    meta: {touched, error}, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    required, //eslint-disable-line react/prop-types
    shrink, //eslint-disable-line react/prop-types
    children, //eslint-disable-line react/prop-types
}) => (
    <FormControl required={required} margin={margin} fullWidth={fullWidth} className={className}>
        {label && <InputLabel error={Boolean(touched && error)} shrink={shrink}>{label}</InputLabel>}
        {children}
        {touched && error && <FormHelperText error={Boolean(touched && error)}>{touched && error}</FormHelperText>}
    </FormControl>
);

const inputStyles = {
    width50: {
        width: 50
    },
    width80: {
        width: 80
    },
    input: {
        height: 19
    }
};

const renderInputFieldStyled = ({
    classes,  //eslint-disable-line react/prop-types
    className,  //eslint-disable-line react/prop-types
    input,  //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    meta, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    required, //eslint-disable-line react/prop-types
    prefix, //eslint-disable-line react/prop-types
    suffix, //eslint-disable-line react/prop-types
    width, //eslint-disable-line react/prop-types
    multiline, //eslint-disable-line react/prop-types
    ...custom
}) => (
    <FieldWrapper
        required={required}
        margin={margin}
        fullWidth={fullWidth}
        meta={meta}
        label={label}
        className={classnames(width && classes[`width${width}`],className)}
    >
        <Input
            classes={multiline ? null : {input: classes.input}}
            {...input} {...custom} multiline={multiline}
            startAdornment={prefix && <InputAdornment position="start">{prefix}</InputAdornment>}
            endAdornment={suffix && <InputAdornment position="end">{suffix}</InputAdornment>}
        />
    </FieldWrapper>
);

export const renderInputField = withStyles(inputStyles)(renderInputFieldStyled);

export const renderSelectField = ({
    className,  //eslint-disable-line react/prop-types
    input,  //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    meta, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    required, //eslint-disable-line react/prop-types
    children, //eslint-disable-line react/prop-types
    ...custom
}) => (
    <FieldWrapper required={required} margin={margin} fullWidth={fullWidth} meta={meta} label={label} className={className}>
        <Select {...input} {...custom}>
            {children}
        </Select>
    </FieldWrapper>
);

export const renderTagListField = ({
    input: {value, onChange},  //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    meta, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    required, //eslint-disable-line react/prop-types
    readOnly, //eslint-disable-line react/prop-types
    ...custom
}) => (
    <FieldWrapper required={required} margin={margin} fullWidth={fullWidth} meta={meta} label={label}>
        <TagList value={value} onChange={!readOnly && onChange} readOnly={readOnly} {...custom}/>
    </FieldWrapper>
);


export const renderRadioField = ({
    input: { value, onChange },  //eslint-disable-line react/prop-types
    label, //eslint-disable-line react/prop-types
    meta, //eslint-disable-line react/prop-types
    margin, //eslint-disable-line react/prop-types
    fullWidth, //eslint-disable-line react/prop-types
    required, //eslint-disable-line react/prop-types
    readOnly, //eslint-disable-line react/prop-types
    optionValue, //eslint-disable-line react/prop-types
    className, //eslint-disable-line react/prop-types
    ...custom
}) => (
        <FieldWrapper required={required} margin={margin} fullWidth={fullWidth} meta={meta} label={label}>
            <Radio
                {...custom}
                readOnly={readOnly}
                checked={optionValue === value}
                onChange={onChange}
                value={optionValue}
                className={className instanceof Function
                    ? className(value)
                    : className
                }
            />
        </FieldWrapper>
    );



