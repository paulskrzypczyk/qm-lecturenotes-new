---
title: "Problem Class Week 17 Problems"
short_title: "Week 17"
numbering: false
---

These are the problems that we will solve during the problem class in week 16. **You are not expected to attempt these questions in advance of the problem class.** We will work through them in sequence, going through the solutions after everybody has time to attempt the questions.

I have included **additional questions** for you to attempt / discuss if you complete the questions before we go over the solution. If you also complete these, please work through [](w17-problems.md)

## Problems

````{tip .simple} Problem 1
In this question we will study **angular momentum** in 3D quantum mechanics. 
1. **Write down** the formula from **classical mechanics** for the angular momentum $\Lvec$ of a particle, in terms of its position $\rvec$ and momentum $\pvec$. 

    Write out **each component** $L_x$, $L_y$ and $L_z$ explicitly. 

2. Use part 1 to **write down** the quantum mechanical **angular momentum operator** $\hat{\Lvec} = (\hat{L}_x, \hat{L}_y, \hat{L}_z)$. 

3. Confirm that each component of $\hat{\Lvec}$ is a **Hermitian operator**. What is the **physical significance of this**? 
    
    *Hint: What is $(\hat{A}\hat{B})^\dagger$ in terms of $\hat{A}^\dagger$ and $\hat{B}^\dagger$ (from 1st year)?*

4. **Calculate** $[\hat{L}_x, \hat{L}_y]$. 

    What is the **physical significance** of your answer?

5. Use part 4 to **make a guess** (without calculation) for $[\hat{L}_y, \hat{L}_z]$ and $[\hat{L}_x, \hat{L}_z]$.

```{dropdown} Additional questions
5. Write down $\hat{L}_{x,\mathrm{w}}$, $\hat{L}_{y,\mathrm{w}}$ and $\hat{L}_{z,\mathrm{w}}.$
6. Calculate $[\hat{L}_{x,\mathrm{w}},\hat{L}_{y,\mathrm{w}}]\psi(x)$, and confirm that it agrees with your answer to part 4. 
```
````

````{tip .simple} Problem 2
Consider the **3D infinite box potential**, of volume $L^3$, with walls at $x = 0$, $x = L$, $y = 0$, $y = L$, $z = 0$ and $z = L$. 

1. **Write down** the energies levels $E_\mathbf{n}$ of the box. 

2. What is the **ground state** energy of the box, and what is the associated (vector of) quantum numbers $\mathbf{n} = (n_x, n_y, n_z)$?

3. State what it means for an energy level to be **degenerate**. 

4. What is the degeneracy of the next set of energy levels, and what are the associated quantum numbers $\mathbf{n}$?

5. Find all of the energy levels that have energy equal to $\frac{38 \hbar^2 \pi^2}{2ML^2}$, and hence determine the degeneracy of these levels. 

6. Consider the state $\ket{\psi_\mathrm{in}} = \frac{1}{\sqrt{3}}(\ket{E_{(1,0,0)}} + \ket{E_{(0,1,0)}} + \ket{E_{(0,0,1)}})$. If this is the state of a particle at $t = 0$, use the **superposition principle** to write down the state $\ket{\psi(t)}$ at time $t$. 
    
    Is this state a **stationary state**?

```{dropdown} Additional questions

7. Find an example of an energy that has higher than six-fold degeneracy. 

8. Do you expect degeneracy to increase with energy in general?

9. How might you code this, to find the degeneracy as a function of energy?

10. Would anything change if the box were **assymetric**, with one side length twice that of the other two sides?
```
````