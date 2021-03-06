import * as React from "react"; // for JSX rendering
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";
import HeadingModalOptionsInterface from '../Interfaces/HeadingModalOptionsInterface'

export default (data: HeadingDataInterface, options: HeadingModalOptionsInterface) => {

    const bootstrapVersion = parseInt(($.fn as any).modal.Constructor.VERSION);
    const closeButton = <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    const modalTitle = <h4 className="modal-title">{options.title}</h4>

    return (
        <div className="modal fade" tabIndex={-1} role="dialog">
            <div className="modal-lg modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        { bootstrapVersion == 3 ? closeButton : modalTitle}
                        { bootstrapVersion == 3 ? modalTitle : closeButton}
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="snb-heading-title">{options.titleLabel}</label>:
                                    <input type="text" className="form-control" id="snb-heading-title" defaultValue={data.title}/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="snb-heading-subtitle">{options.subtitleLabel}</label>:
                                    <input type="text" className="form-control" id="snb-heading-subtitle" defaultValue={data.subtitle}/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="snb-heading-underline-color">{options.underlineColorLabel}</label>:
                                    <input type="color" style={{display: 'block'}} id="snb-heading-underline-color" defaultValue={data.underlineColor}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="close" className="btn btn-default"
                                data-dismiss="modal">{options.closeText}</button>
                        <button type="button" id="save" className="btn btn-primary">{options.saveText}</button>
                    </div>
                    <div className={options.messageContainerClass}>
                        {/*  messages will be added here  */}
                    </div>
                </div>
            </div>
        </div>
    )
}

