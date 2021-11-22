import { useRef, useContext, useEffect } from "react";
import CacheContext from "./CacheContext";
import { DESTORY } from "./cache-types";

function withKeepAlive(
	OldComponent,
	{ cacheId = window.location.pathname, scroll = false }
) {
	return function (props) {
		const { cacheStates, mount, handleScroll, dispatch } =
			useContext(CacheContext);
		const divRef = useRef(null);

		useEffect(() => {
			if (scroll) {
				divRef.current.addEventListener(
					"scroll",
					handleScroll.bind(null, cacheId),
					true
				);
			}
		}, [handleScroll]);

		useEffect(() => {
			const cacheState = cacheStates[cacheId];
			// 如果真实DOM已经渲染完毕
			if (cacheState && cacheState.doms && cacheState.status !== DESTORY) {
				const doms = cacheState.doms; // 出去被生成dom们
				doms?.forEach((dom) => {
					divRef.current.appendChild(dom);
					if (scroll && cacheState.scrolls?.[dom]) {
						dom.scrollTop = cacheState.scrolls[dom];
					}
				}); // 把生成dom放回自己这里
			} else {
				// 如果dom还没有去派生吧
				mount({
					cacheId,
					reactElement: <OldComponent {...props} dispatch={dispatch} />,
				});
			}
		}, [cacheStates, mount, props, dispatch]);
		return <div id={`keepalive_${cacheId}`} ref={divRef} />;
	};
}

export default withKeepAlive;

/**
 * 本组件的核心思路是
 * 我们要通过缓存容器去创建OldComponent对应的真是DOM，并且进行缓存
 * 即使这个OldComponent被销毁了，缓存还可以保留
 * 以后这个OldComponent再次渲染的时候，可以复用上次的缓存就可以了
 */
