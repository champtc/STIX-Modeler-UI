import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import classNames from "classnames";
import Tooltip from "react-tooltip";

import arrStyle from "./arrayselector.scss";

@inject("store")
@observer
export default class ArraySelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addLabel: false,
            label: '',
        }

        this.onChangeLabel = this.onChangeLabel.bind(this);
    }

    componentDidMount() {

    }

    onClickHandler(field, value) {
        this.props.onClickHandler(field, value);
    }

    onSetAddLabel(value) {
        this.setState({ addLabel: value });
    }

    onChangeLabel(e) {
        const value = e.target.value;
        console.log('Value: ', value);
        console.log('Event: ', e);
        this.setState({ label: value });
    }

    render() {
        const items = this.props.vocab ? this.props.vocab : [];
        const field = this.props.field;
        const value = this.props.value || '';
        const description = this.props.description;

        let cls = classNames({
            "array-container-item": true
        });


        return (
            <div className="array-container">
                <div className="array-container-header">
                    {field} <span data-tip={description} className="material-icons">info</span>
                    {(field && field.includes('labels') ?
                        (this.state.addLabel) ?
                            <>
                                <form onSubmit={() => {
                                    this.onSetAddLabel(false);
                                    this.props.onClickAddLabel(this.state.label)
                                    this.setState({ label: '' })
                                }}>
                                    <input value={this.state.label} onChange={this.onChangeLabel} />
                                </form>
                                <button style={{ width: '4rem', height: '3rem' }} onClick={() => this.onSetAddLabel(false)}>Cancel</button> </>
                            : <button style={{ width: '4rem', height: '3rem' }} onClick={() => this.onSetAddLabel(true)}>Add Label</button>
                        : '')}
                </div>
                <div className="array-container-body">
                    {

                        items.map((item, i) => {
                            if (value.indexOf(item) > -1) {
                                cls = classNames({
                                    "array-container-item": true,
                                    "array-container-selected": true
                                });
                            } else {
                                cls = classNames({
                                    "array-container-item": true
                                });
                            }
                            return <><div className={cls} key={i} onClick={() => this.onClickHandler(field, item)}>{item}
                        
                            </div>
                            {(field.includes('labels')) ? <button style={{ width: '4rem', height: '3rem' }} onClick={() => {
                                console.log('Item: ', item);
                                this.props.onClickRemoveLabel(item)}}>Delete</button> : ''}
                            </>
                        })
                    }
                </div>
            </div>
        )
    }
}
