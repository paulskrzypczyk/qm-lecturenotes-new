---
title: "Problem Class Week 14 Problems"
short_title: "Week 14"
---

These are the problems that we will solve during the problem class in week 14. **You are not expected to attempt these questions in advance of the problem class.** We will work through them in sequence, going through the solutions after everybody has time to attempt the questions.

I have included **additional questions** for you to attempt / discuss if you complete the questions before we go over the solution. If you also complete these, please work through [](w14-problems.md)

````{tip .simple} Problem 1
1. What is the action of the operator $\hat{X}^2$ on a position state $\ket{x}$?
2. What is the action of the operator $\hat{X}^2$ on a (generic) quantum state $\ket{\psi} = \infint \psi(x) \ket{x} dx$?
3. Write down the general relationship between an operator $\hat{A}$ (that acts on quantum states $\ket{\psi}$) and the operator $\op{A}$ (that acts on wavefunctions).
4. Use parts 2. and 3. to write down the operator $\op{X}^2$.

```{dropdown} Additional questions
   5. What is the eigenvalue equation for the operator $\hat{X}^2$?
   6. Can you spot what the eigenstates of $\hat{X}^2$ are, and their corresponding eigenvalues?
   7. Is $\hat{X}^2$ a *degenerate* operator? (that is, are there multiple eigenstates which have the same eigenvalue?) If yes, how many states share an eigenvalue?
   8. What is the physical significance of an operator being degenerate or not?
   ```
````

````{tip .simple} Problem 2
1. Write down the operator $\op{P}$ associated to $\hat{P}$. 
2. Calculate the commutator $[\op{X}^2, \op{P}]\psi(x)$ (where $\psi(x)$ is a generic wavefunction). 
3. Use part 2. to **write down** the commutator $[\hat{X}^2, \hat{P}]$. 
4. What is the physical significance of your answer to part 3?

```{dropdown} Additional questions
   5. Calculate $[\op{X}^3, \op{P}]\psi(x)$, and hence write down $[\hat{X}^3, \hat{P}]$. 
   6. Use part 5. to make a guess for what the commutator $[\hat{X}^n,\hat{P}]$ might be, where $n$ is a positive integer. 
   7. Mathematically show that your guess from part 6 is correct.
   ```
````
````{tip .simple} Problem 3
1. What is the action of the operator $\hat{P}$ on a (generic) quantum state $\ket{\psi} = \infint \psi(x) \ket{x} dx$?
2. What is the action of the operator $\hat{P}^2$ on a (generic) quantum state $\ket{\psi} = \infint \psi(x) \ket{x} dx$?
3. Use part 2. to write down $\op{P}^2$. 

```{dropdown} Additional questions
   4. Calculate $[\op{X}, \op{P}^2]\psi(x)$, and hence write down $[\hat{X}, \hat{P}^2]$. 
   5. Use part 5. to make a guess for what the commutator $[\hat{X},\hat{P}^n]$ might be, where $n$ is a positive integer. 
   6. Mathematically show that your guess from part 5 is correct.
   ```
````

````{tip .simple} Problem 3
Consider the  particle from last week's problem class, **(initially)** confined to the region $x \geq 0$, with the following quantum state
```{math}
:label: eq-pc14-wf
 \ket{\psi_\mathrm{in}} = \sqrt{\frac{2}{L}}\int_0^\infty e^{-x/L} \ket{x} dx,
 ```
where $L > 0$ is a constant.  We will assume that **there are no forces acting on the particle** so that it is a **free particle**. 

1. Write down the equation from the notes, which gives the (generic) quantum state at time $t$, $\ket{\psi(t)}$, assuming that a particle has a momentum wavefunction at time $t = 0$ given by $\tilde{\psi}_\mathrm{in}(p)$. 

2. Look up the momentum wavefunction of [](#eq-pc14-wf) from last week. Assuming that this is the momentum wavefunction at $t = 0$, write down the quantum state of the particle at $t$, $\ket{\psi(t)}$.

```{dropdown} Additional questions
   3. Write down (an integral) which gives the spatial wavefunction $\psi(x,t)$ of the particle.
   4. Think about how you might numerically integrate this, to see the evolution.
   ```
````