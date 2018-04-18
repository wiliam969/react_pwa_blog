import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    CellMeasurer,
    CellMeasurerCache,
    createMasonryCellPositioner,
    Masonry
} from 'react-virtualized';



export default class galleryMasonry extends Component {

    // Array of images with captions
    list = [
        "https://backend.kerstin-witte.de/wp-content/uploads/2018/04/6662_2.jpg",
        "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.dumpaday.com%2Fwp-content%2Fuploads%2F2017%2F05%2Flooking-at-funny-pictures-on-dumpaday.jpg&f=1",
        "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fdailylolpics.com%2Fwp-content%2Fuploads%2F2017%2F02%2Fz-funny-77.jpg&f=1",
    ];

    // Default sizes help Masonry decide how many images to batch-measure
    cache = new CellMeasurerCache({
        defaultHeight: 250,
        defaultWidth: 200,
        fixedWidth: true
    })

    // Our masonry layout will use 3 columns with a 10px gutter between
    cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: 3,
        columnWidth: 200,
        spacer: 10
    })

    cellRenderer ({ index, key, parent, style }) {
        const datum = this.list[index]

        return (
            <CellMeasurer
                cache={this.cache}
                index={index}
                key={key}
                parent={parent}
            >
                <div style={style}>
                    <img
                        src={datum.source}
                        style={{
                            height: datum.imageHeight,
                            width: datum.imageWidth
                        }}
                    />
                    <h4>{datum.caption}</h4>
                </div>
            </CellMeasurer>
        )
    }

    render() {
        return (
            <Masonry
                cellCount={this.list.length}
                cellMeasurerCache={this.cache}
                cellPositioner={this.cellPositioner}
                cellRenderer={this.cellRenderer}
                height={600}
                width={800}
            />
        )
    }
}
