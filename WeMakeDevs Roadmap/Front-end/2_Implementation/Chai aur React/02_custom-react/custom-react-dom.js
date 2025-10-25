const customReactDOM = {
    createRoot: function (targetContainer) {
        const reactRootNode = {
            customRender: function(reactComponent) {

                if(typeof reactComponent != 'object') {
                    targetContainer.appendChild(document.createTextNode(reactComponent));
                    return;
                }

                const {type, props, children} = reactComponent;

                const tagName = (type == 'ReactComponent')? 'div': type;
                const domElement = document.createElement(tagName);

                Object.keys(props).forEach(prop => domElement.setAttribute(prop, props[prop]));

                const lastContainer = targetContainer;
                targetContainer = domElement;
                children.forEach(child => this.customRender(child));
                targetContainer = lastContainer;

                targetContainer.appendChild(domElement);
            }
        }
        return reactRootNode;
    }
}

export default customReactDOM;