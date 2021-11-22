import { CREATE, CREATED, DESTORY } from "./cache-types";
/**
 *
 * @param {*} state 缓存状态
 * @param {*} action 改变状态的方法
 */
function cacheReducer(state = {}, { type, payload }) {
	return (
		{
			CREATE: {
				...state,
				[payload.cacheId]: {
					cacheId: payload.cacheId, // 缓存ID
					reactElement: payload?.reactElement, // 要渲染的虚拟DOM
					status: CREATE, // 缓存的状态是创建
					scrolls: {}, // 滚动信息保存对象 默认是key滚动的DOM 值是滚动的位置
				},
			},
			// 真实DOM已经成功创建
			CREATED: {
				...state,
				[payload.cacheId]: {
					...state[payload.cacheId], // 缓存ID
					doms: payload?.doms, // 此虚拟DOM对应的真实DOM
					status: CREATED, // 缓存的状态是创建
				},
			},
			DESTORY: {
				...state,
				[payload.cacheId]: {
					...state[payload.cacheId], // 缓存ID
					status: DESTORY, // 缓存的状态是创建
				},
			},
		}[type] || state
	);
}

export default cacheReducer;
