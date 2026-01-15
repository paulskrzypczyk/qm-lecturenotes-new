---
title: "Problem Class Week 13 Problems"
short_title: "Week 13"
---

These are the problems that we will solve during the problem class in week 13. **You are not expected to attempt these questions in advance of the problem class.** We will work through them in sequence, going through the solutions after everybody has time to attempt the questions.

I have included additional questions for you to attempt / discuss if you complete the questions before we go over the solution. 

````{tip .simple} Problem 1
Consider a  particle confined to the region $x \geq 0$, with the following quantum state
```{math}
:label: e-exp-wf
 \ket{\psi} = \sqrt{\frac{2}{L}}\int_0^\infty e^{-x/L} dx,
 ```
where $L > 0$ is a constant. 

1. Write down (read off) the wavefunction $\psi(x)$ of the particle.
2. Write down the normalisation condition (i) in terms of the quantum state (ii) in terms of the wavefunction. 
3. Using part 2. confirm that the quantum state [](#e-exp-wf) is normalised.
4. Sketch the wavefunction $\psi(x)$ and the probability density $\pd(x)$.
5. Calculate the expected value of the position of the particle $\langle x \rangle$

```{dropdown} Additional questions
   6. What are the units of $L$? Does $L$ have any physical significance/interpretation?
   6. Use [Desmos](https://www.desmos.com/calculator) to make an interactive plot of the wavefunction/probability density, to investigate what properties of the particle change as $L$ is varied. 
   6. Calculate the probability to find the particle in the region $0\leq x\leq L$. 
   7. Calculate the uncertainty (standard deviation) $\Delta x$ in the position of the particle.
   ```
````

````{tip .simple} Problem 2
Consider a  particle confined to the region $x \geq 0$, with the following quantum state
```{math}
:label: e-exp-wf-2
 \ket{\psi} = \sqrt{\frac{2}{L}}\int_0^\infty e^{-x/L} dx,
 ```
where $L > 0$ is a constant. 

1. Write down the relationship between the spatial and momentum wavefunctions. 
1. Using part 1. to calculate the momentum wavefunction $\tilde{\psi}(p)$ of the particle.
2. Use [Desmos](https://www.desmos.com/calculator) (or otherwise) to sketch the momentum wavefunction $\tilde{\psi}(p)$ and momentum probability density $\pd(p)$.

```{dropdown} Additional questions
   4. Use Desmos to explore how the momentum wavefunction of the particle changes as $L$ varies. How does this compare to how the spatial wavefunction varied? 
   4. Use Desmos to calculate the average momentum $\langle p \rangle$ and uncertainty (standard deviation) $\Delta p$ of momentum of the particle. 
   4. Confirm that the Heisenberg Uncertainty Principle is satisfied.
   ```
````

