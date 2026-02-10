---
title: "Problem Class Week 16 Problems"
short_title: "Week 16"
numbering: false
---

These are the problems that we will solve during the problem class in week 16. **You are not expected to attempt these questions in advance of the problem class.** We will work through them in sequence, going through the solutions after everybody has time to attempt the questions.

I have included **additional questions** for you to attempt / discuss if you complete the questions before we go over the solution. If you also complete these, please work through [](w16-problems.md)

## Problems

````{tip .simple} Problem 1
Consider a **classical** particle of mass $M$ undergoing simple harmonic motion under the force $F = -M\omega^2 x$, where $\omega$ is the frequency of the oscillator (i.e. we have written the spring constant as $k = M\omega^2$).  

1. Write down the potential energy of the particle, as a function of its position $x$.
2. When the particle is at maximum displacement, what is its kinetic energy?
3. Use your answers to parts 1. and 2. to derive an equation which gives the amplitude of oscillation as a function of the energy of the particle. 

Assume now that the energy of the particle is equal to the energy of the $n^\mathrm{th}$ energy eigenstate of the **quantum** harmonic oscillator, $E_n = \hbar \omega (n + \frac{1}{2})$. 

4. Express the amplitude of the particle in terms of the **characteristic length** $\ell = \sqrt{\frac{\hbar}{M\omega}}$ of the quantum harmonic oscillator. 

Consider now a **quantum** particle, confined within a harmonic oscillator potential well. Assume the particle is in the ground state $\ket{E_0}$. 

5. What does it mean for a particle to be **tunnelling** in quantum mechanics? 

6. Use the previous parts of this question to determine the regions of space where the particle would be tunneling. 

7. Calculate the total probability that, upon measurement of the position of the particle, it will be within the tunnelling region (*you will need to evalute the integral **numerically***). 


```{dropdown} Additional questions
8. What is the general expression for the position of a particle at time $t$, if it is undergoing simple harmonic motion?
9. Use part 8. to determine the kinetic energy of the particle when it is at the origin. 
10. Confirm that you can use the kinetic energy at the origin to arrive at the *same* expression relating the amplitude of oscillation and the energy. 
11. Repeat the calculation in part 7, except now assume that the particle is in a different energy eigenstate $\ket{E_k}$, for $k = 1$, $2$, and $3$ (that is, determine the tunnelling probability for the four lowest energy eigenstates). Does the probability increase or decrease with energy? Is this what you would have expected to be the case? 
```
````
````{tip .simple} Problem 2
Consider the following **infinite wall** potential
```{math}
V(x) = \begin{cases}
\infty &\text{ if } x < 0,\\ 0 & \text{ if } x \geq 0. 
\end{cases}
```
We will consider **scattering** off of the wall. We will write the energy eigenfunction (of energy $E$) as
```{math}
u_E(x) = \begin{cases}
u_E^\rI(x) &\text{ if } x \geq 0,\\ r_E^\rII(x) &\text{ if } x < 0.
\end{cases}
```

1. By recalling how the energy eigenfunctions of the **infinite square well** potential behave, **write down** the form of the function $u_E^\rII(x)$ in Region II.
2. Write down the TISE in Region I.
3. Solve the TISE in region I, to find the **general** form of $u_E^\rI(x)$ in this region. 
4. Write down the **continuity condition** that must be satisfied by energy eigenfunctions. 
5. Use part 4. to **solve** for one of the integration constants from part 3. 

```{dropdown} Additional questions
6. Do you expect to be able to solve for the other integration constant? Do you expect it to be finite or infinite?
7. How can you **use** the energy eigenfunctions to study the behaviour of e.g. a **Gaussian** wavefunction with **negative** average momentum?
8. Use desmos (or some other numerical technique) to investigate this. 
```


````

% ## Solutions
