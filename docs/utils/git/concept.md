# concept 

## 工作区

- 工作区 (Working Directory)：正在修改代码的地方
- 暂存区 (Staging Area / Index)：一个中间区域，用来存放你准备提交的修改。
- 本地仓库 (Repository)：保存所有版本记录的地方（即隐藏的 .git 文件夹）


```mermaid
stateDiagram-v2
    %% 定义全局样式（保持你原有的颜色方案）
    classDef area fill:#f5f5f5,stroke:#333,stroke-width:2px,font-weight:bold
    classDef untracked fill:#ffccd5,stroke:#ff4d6d
    classDef modified fill:#ffe5b4,stroke:#ffa500
    classDef staged fill:#d1ffbd,stroke:#32cd32
    classDef committed fill:#caf0f8,stroke:#0077b6
    classDef stashed fill:#e2daff,stroke:#6a5acd
    classDef pushed fill:#a5d8ff,stroke:#1e90ff  %% 新增：已推送的强调色（可选微调）

    %% 工作区
    state "工作区 (Working Directory)" as WD {
        state "未追踪 (Untracked)" as UT
        state "已修改 (Modified)" as MD
    }
    class WD area
    class UT untracked
    class MD modified

    %% 暂存区
    state "暂存区 (Staging Area)" as SA {
        state "已暂存 (Staged)" as ST
    }
    class SA area
    class ST staged

    %% 本地仓库
    state "本地仓库 (Local Repository)" as RP {
        state "已提交 (Committed)" as UM
    }
    class RP area
    class UM committed

    %% 远程仓库
    state "远程仓库 (Remote Repository)" as RR {
        state "已推送 (Pushed)" as UP
    }
    class RR area
    class UP pushed  %% 使用新样式，或改回 committed 如果不想区分

    %% 储藏区
    state "储藏区 (Stash Stack)" as SS {
        state "已储藏 (Stashed)" as SH
    }
    class SS area
    class SH stashed

    %% 核心逻辑流转（本地部分保持原样）
    UT --> ST : git add
    MD --> ST : git add
    ST --> UM : git commit
    UM --> MD : 修改已提交的文件后未 add

    %% Stash 逻辑（保持原样）
    MD --> SH : git stash (save changes)
    ST --> SH : git stash (save staged + unstaged)
    SH --> MD : git stash pop / apply

    %% 新增：push 和 pull
    UM --> UP : git push
    UP --> UM : git pull (fetch + merge/rebase)

    %% 可选：pull 也可能导致冲突 → 回到 Modified（简化表示）
    UP ..> MD : git pull 冲突 → 手动解决

    %% 起点（可选，展示典型起点）
    [*] --> UT : 新文件 / clone 后
```


## hunk 
Hunk = “代码块变更单元” / “补丁块”
Git 看变更时，不是一行一行单独看，而是把连续的、相关的修改归成一个 hunk。
比如你一次改了 5 行连续的代码 → 这就是一个 hunk。
如果你在文件里改了两处不挨着的地方 → 就会分成两个 hunk。

Hunk action = 对某个 hunk（变更块）直接做操作

## line blame 

“行级 Git blame” / “这行代码是谁改的”

它会告诉你当前光标所在的那一行代码：
是谁（作者）
什么时候（commit 时间）
在哪个 commit 里改的
commit 的 message（简短或完整）
