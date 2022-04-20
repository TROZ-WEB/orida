/* eslint-disable-next-line max-len */
/* SOURCE: https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940?permalink_comment_id=3883788#gistcomment-3883788 */
import { useCallback, useEffect, useRef } from 'react';

const useDebounce = <F extends (...args: any) => any>(
    func: F,
    waitFor: number = 300
): ((...args: Parameters<F>) => ReturnType<F>) => {
    const timer = useRef<any | null>();
    const savedFunc = useRef<F | null>(func);

    useEffect(() => {
        savedFunc.current = func;
    }, [waitFor]);

    return useCallback((...args: any) => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }

        timer.current = setTimeout(() => savedFunc.current?.(...args), waitFor);
    }, []) as (...args: Parameters<F>) => ReturnType<F>;
};

export default useDebounce;
