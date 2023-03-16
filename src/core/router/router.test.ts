import { expect } from 'chai';
import * as sinon from 'sinon'
import Router from './router';
import 'jsdom-global/register';

import { ERoutes } from '../enums';
import { Block } from '../block';

const router = new Router('.app');

describe('Testing the Router', () => {
    beforeEach(() => {
        window.history.forward = sinon.fake();
        window.history.back = sinon.fake();
    });

    class MockBlock extends Block { }

    it('Testing the method - use. Method should return the Router class.', () => {
        const result = router.use(ERoutes.MAIN, MockBlock);

        expect(result).to.eq(router);
    });

    it('Testing the method - forward. Windows history should be called 1 time.', () => {
        router.forward();

        expect((window.history.forward as any).callCount).to.eq(1);
    });

    it('Testing the method - back. Windows history should be called 1 time.', () => {
        router.back();

        expect((window.history.back as any).callCount).to.eq(1);
    });
});

