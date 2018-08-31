import React from "react";

export default ({ text, username, handleTextChange }) => (

                        <input
                            type="text"
                            value={text}
                            placeholder="chat here..."
                            className="form-control"
                            onChange={handleTextChange}
                            onKeyDown={handleTextChange}
                        />

);