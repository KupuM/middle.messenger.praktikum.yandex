import { expect } from 'chai';
import { Block } from './block';
import 'jsdom-global/register';

describe('Testing the Block (base component).', () => {
    class MockBlock extends Block {
        props: { className: string, testProp: string };
        state: { testState: string };

        render() {
            return '<div>test content</div>';
        }
    }

    describe("Testing the Block class", () => {
        let component: MockBlock;

        const props = {
            testProp: "propValue",
        };

        beforeEach(() => {
            component = new MockBlock(props);
        });

        it("The properties should be set correctly.", () => {
            component.setProps(props);
            expect(component.props.testProp).to.equal(props.testProp);
        });

        it('Compoment sould be render correctly.', () => {
            console.log(`component.getContent().innerHTML =`, component.getContent().innerHTML);
        });
    })
})
