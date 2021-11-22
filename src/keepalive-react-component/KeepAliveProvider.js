import React, { useReducer, useCallback } from "react";
import cacheReducer from "./cacheReducer";
import CacheContext from "./CacheContext";
import * as cacheTypes from "./cache-types";

function KeepAliveProvider(props) {
	// cacheStates存放所有的缓存信息 dispatch派发动作方法 可以通过派发动作修改缓存信息
	const [cacheStates, dispatch] = useReducer(cacheReducer, {});
	const mount = useCallback(
		({ cacheId, reactElement }) => {
			if (cacheStates[cacheId]) {
				const cacheState = cacheStates[cacheId];
				if (cacheState.status === cacheTypes.DESTORY) {
					const doms = cacheStates.doms;
					doms?.forEach((dom) => dom.parentNode.removeChild(dom));
					// 创建缓存
					dispatch({
						type: cacheTypes.CREATE,
						payload: { cacheId, reactElement },
					});
				}
			} else {
				// 创建缓存
				dispatch({
					type: cacheTypes.CREATE,
					payload: { cacheId, reactElement },
				});
			}

            
		},
		[cacheStates]
	);

	const handleScroll = useCallback(
		(cacheId, { target }) => {
			if (cacheStates[cacheId]) {
				const scrolls = cacheStates[cacheId].scrolls;
				scrolls[target] = target.scrollTop;
			}
		},
		[cacheStates]
	);

	return (
		<CacheContext.Provider
			value={{ cacheStates, dispatch, mount, handleScroll }}
		>
			{props.children}
			{Object.values(cacheStates)
				.filter((cacheState) => cacheState.status !== cacheTypes.DESTORY)
				.map(({ cacheId, reactElement }) => (
					<div
						id={`cache-${cacheId}`}
						key={cacheId}
						ref={
							// 如果给原生组件添加了ref,那么当此真实DOM渲染到页面之后会执行回调函数
							(dom) => {
								const cacheState = cacheStates[cacheId];
								if (
									dom &&
									(!cacheState.doms || cacheState.status === cacheTypes.DESTORY)
								) {
									// dom儿子们就是这个reactElement渲染出来的真实DOM
									const doms = Array.from(dom.childNodes);
									dispatch({
										type: cacheTypes.CREATED,
										payload: { cacheId, doms },
									});
								}
							}
						}
					>
						{reactElement}
					</div>
				))}
			{/* {
				<div
					id="e"
					ref={(dom) => {
						dom && aaaa.push(Array.from(dom.childNodes));
					}}
				>
					<input></input>
				</div>
			}

			{
				<div
					id="d"
					ref={(dom) => {
						// console.log(aaaa);
						setTimeout(() => {
							const e = document.getElementById("e");
                            console.log('e',e);
							dom?.appendChild(e);
						});

						// const b = aaaa[0];
						// b.forEach((item) => dom?.appendChild(item));
					}}
				></div>
			} */}
		</CacheContext.Provider>
	);
}

export default KeepAliveProvider;
