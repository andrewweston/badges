import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        width: '100%',
        flexWrap: 'wrap'
    },
    autosizeInput: {
        display: 'inline',
        width: 'auto',
        flexGrow: 1
    },
    chip: {
        margin: theme.spacing(0.5, 0.25)
    },
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainer: {
        zIndex: 10000
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'inline-block',
        margin: theme.spacing(0.25),
    },
    suggestionsList: {
        margin: 0,
        padding: theme.spacing(0.5),
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
}));

function getSuggestions(suggestions, value, lookupValue) {
    const inputValue = deburr(lookupValue.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    const item = value || [];

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep = !item.find(x => x === suggestion.id) &&
                count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue.toLowerCase();

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.id;
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
        <Chip 
            variant="outlined" 
            /*selected={isHighlighted}*/ 
            component="div"
            label={
                <div>
                    {parts.map(part => (
                        <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                            {part.text}
                        </span>
                    ))}
                </div>
            }
        />
    );
}

const renderHtmlInput = ({ inputRef = () => { }, tags, onDelete, chipClass, ...props }) => {
    const items = tags || []
    return (
        <React.Fragment>          
            {items.map(t => <Chip key={t.id} variant="outlined" className={chipClass} size="small" onDelete={onDelete(t)} label={t.name} />)}
            <input {...props} ref={inputRef} />
        </React.Fragment>
    )
}

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, tags, onDelete, suggestions, value, ...other } = inputProps;

    return (
        <Input
            inputRef={node => {
                ref(node);
                inputRef(node);
            }}
            classes={{
                root: classes.input,
                input: classes.autosizeInput
            }}
            {...other}
            value={value ? [...tags, value] : tags}
            inputComponent={renderHtmlInput}
            inputProps={{value, tags, onDelete, chipClass: classes.chip}}
        />
        
    );
}

const TagList = (props) => {
    const {list, value, onChange, readOnly} = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        single: '',
        popper: '',
    });

    const [stateSuggestions, setSuggestions] = React.useState([]);

    const handleSuggestionsFetchRequested = ({ value: lookupValue }) => {
        setSuggestions(getSuggestions(list, value, lookupValue));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = (event, { newValue }) => {
        setState({
            ...state,
            popper: newValue,
        });
    };

    const handleSelection = (event, {suggestion}) => {
        onChange([...value, suggestion.id]); 
        event.target.value = ''; 
        setState({
            ...state,
            popper: '',
        });
    };

    const acceptInput = (event) => {
        let v = event.target.value;
        v = list.find(x => x.name.toLowerCase() === v.toLowerCase()) || v; //replace the typed in tag label with its id if exists
        v = v.id || v;
        if (!v) return;

        const item = value || [];

        if (!item.find(x => x.toLowerCase() === v.toLowerCase())) {
            onChange([...value, v]); //add only if it is a new tag
        }
        event.target.value = '';
        setState({
            ...state,
            popper: '',
        });
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault(); 
            acceptInput(event);
        }
    };

    const handleDelete = tag => () => {
        onChange(value.filter(t => t !== tag.id));
    }

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        onSuggestionSelected: handleSelection,
        getSuggestionValue,
        renderSuggestion,
    };

    return (
        <Autosuggest
            {...autosuggestProps}
            inputProps={{
                classes,
                value: state.popper,
                tags: value && value.map(v => list.find(x => x.id === v) || {id: v, name: v}),
                onChange: handleChange,
                onKeyDown: readOnly ? null : handleKeyDown,
                inputRef: node => {
                    setAnchorEl(node);
                },
                onDelete: handleDelete,
                onBlur: acceptInput
            }}
            theme={{
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
                <Popper anchorEl={anchorEl} open={Boolean(options.children)} className={classes.suggestionsContainer}>
                    <Paper
                        square
                        {...options.containerProps}
                        style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
                    >
                        {options.children}
                    </Paper>
                </Popper>
            )}
        />
    );
}

TagList.propTypes = {
    list: PropTypes.array.isRequired,
};

export default TagList;