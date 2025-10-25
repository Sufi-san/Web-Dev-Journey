
function Link() {
    const arrowRight = {
        type: 'span',
        props: {
            id: 'arrow-right'
        },
        children: ['->']
    }

    const arrowLeft = {
        type: 'span',
        props: {
            id: 'arrow-left'
        },
        children: ['<-']
    }

    const url = {
        type: 'a',
        props: {
            href: 'https://youtu.be/kAOuj6o7Kxs?feature=shared',
            target: '_blank'
        },
        children: ['Click here to visit YouTube']
    }

    const reactComponent = {
        type: 'ReactComponent',
        props: {id:'link-comp', style: "background-color: yellow; margin: 0px 80px;"},
        children: [
            arrowRight, url, arrowLeft
        ]
    }

    return reactComponent;
}

export default Link;
