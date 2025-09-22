import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AppHeader from '../AppHeader.vue';
import { useRouter, useRoute } from 'vue-router';
import { Title, MenuItem } from '../assets/styles/AppHeaderCss';

// vue-router를 모의(mock)합니다.
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useRoute: vi.fn(() => ({
    path: '/',
  })),
}));

describe('AppHeader.vue', () => {
  it('컴포넌트가 올바르게 렌더링됩니다', () => {
    const wrapper = mount(AppHeader, {
      global: {
        components: { Title, MenuItem }
      }
    });
    expect(wrapper.exists()).toBe(true);
    // '한방에 큐' 텍스트를 포함하는 Title 컴포넌트가 있는지 확인
    expect(wrapper.findComponent(Title).text()).toContain('한방에 큐');
  });

  it('"수급자조회하기" 메뉴를 클릭하면 navigateTo 함수가 호출됩니다', async () => {
    const push = vi.fn();
    useRouter.mockImplementation(() => ({
      push,
    }));

    const wrapper = mount(AppHeader, {
      global: {
        components: { Title, MenuItem }
      }
    });
    // MenuItem 컴포넌트 중에서 '수급자조회하기' 텍스트를 포함하는 것을 찾습니다.
    const menuItem = wrapper.findAllComponents(MenuItem).filter(w => w.text().includes('수급자조회하기'))[0];
    await menuItem.trigger('click');
    expect(push).toHaveBeenCalledWith({ path: '/' });
  });

  it("현재 경로에 따라 메뉴 아이템에 'router-link-active' 클래스가 올바르게 적용됩니다", async () => {
    // 현재 경로를 /schedule로 모의합니다.
    useRoute.mockImplementation(() => ({
      path: '/schedule',
    }));

    const wrapper = mount(AppHeader, {
      global: {
        components: { Title, MenuItem }
      }
    });
    // '한방에큐' 메뉴 아이템을 찾고 'router-link-active' 클래스가 있는지 확인합니다.
    const scheduleMenuItem = wrapper.findAllComponents(MenuItem).filter(w => w.text().includes('한방에큐'))[0];
    expect(scheduleMenuItem.classes()).toContain('router-link-active');

    // 다른 메뉴 아이템에는 'router-link-active' 클래스가 없는지 확인합니다.
    const homeMenuItem = wrapper.findAllComponents(MenuItem).filter(w => w.text().includes('수급자조회하기'))[0];
    expect(homeMenuItem.classes()).not.toContain('router-link-active');
  });
}); 