import {toggleEditor} from '../../EntityOccupations';
import actions from '../actions';
import {getPerson, updateEntity, deleteEntity} from '../api';
import details from '../../reusable/containers/details';
import EntityDetails from '../views/entityDetails';

const extraProps = state => ({
    occupations: state.occupations.list
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(actions.show()),
    onShowPerson: entity => {
        Promise.all([
            getPerson(entity.id)
        ]).then(([data]) => dispatch(actions.show({
            ...entity,
            ...data
        })));
        dispatch(actions.show(entity));
    },
    onUpdate: entity => {
        Promise.all([
            updateEntity(entity.id, entity)
        ]).then(([data]) => dispatch(actions.show({
            ...entity,
            ...data
        })));
        dispatch(actions.show(entity));
    },
    onToggleDeleteDialog: () => dispatch(actions.toggleDeleteDialog()),
    onDelete: (entity, showOnDelete) => {debugger; return deleteEntity(entity)
        .then(() => {
            dispatch(actions.toggleDeleteDialog());
            if (showOnDelete < 0) {
                dispatch(actions.show());
            }
            else {
                dispatch(actions.show(showOnDelete));
            }
            dispatch(actions.remove(entity));
        })},
    onChooseOccupations: () => dispatch(toggleEditor())
});

export default details({
    View: EntityDetails,
    stateName: 'entities',
    extraProps,
    mapDispatchToProps
});
