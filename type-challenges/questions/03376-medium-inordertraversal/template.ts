interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

/** 知识点,二叉树的中序遍历,https://zhuanlan.zhihu.com/p/56895993 */

/** 解法:https://github.com/type-challenges/type-challenges/issues/5220 */
type InorderTraversal<T extends TreeNode | null> =
  /** 知识点,T 是联合类型,需要通过[]规避分配性 */ [T] extends [TreeNode]
    ? [
        ...InorderTraversal<T['left']>,
        T['val'],
        ...InorderTraversal<T['right']>
      ]
    : []
