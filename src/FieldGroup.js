import { getIdLabel, getLayout, getSectionLabel } from './FieldCommon';

export const RBFieldGroup = (props) => {
  const {id, label, hiddenLabel, as, children} = props;

  const propsGroup = {id, role: 'group', as};
  const propsLabel = {...props, name: id, className: 'rbf-group'};

  let Label;

  if (!hiddenLabel) {
    Label = getSectionLabel(propsLabel);
    propsGroup['aria-labelledby'] = getIdLabel(id);

  } else {
    propsGroup['aria-label'] = label;
  }

  return getLayout(propsGroup, Label, children, props);
};
