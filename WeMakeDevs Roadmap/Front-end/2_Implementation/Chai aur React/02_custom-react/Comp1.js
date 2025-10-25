function Comp1() {
    const heading = {
        type: 'h1',
        props: {class:'heading'},
        children: ['This is a heading']
    }

    const para = {
        type: 'p',
        props: {class:'para'},
        children: ['This is a paragraph']
    }

    const reactComponent = {
        type: 'ReactComponent',
        props: {class:'section'},
        children: [
            heading, para
        ]
    }

    return reactComponent;
}

export default Comp1;